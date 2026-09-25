import {
  getActiveChallenge,
  createChallenge,
  deleteChallenge,
  insertChallengeSchedules,
  getChallengeDayStats,
  getDayTasks,
  getDayNote,
  upsertDayNote,
  getMaxGeneratedDay,
  getAllNotes,
  hasNoticeBeenSent,
  markNoticeSent,
  getRoutineOverrides,
  upsertRoutineOverride,
} from "../models/challengeModel.js";

import { createNotification } from "../models/notificationModel.js";

import { ROUTINE_TASKS } from "../config/routineTasks.js";


// Your db pool uses dateStrings:true + timezone:"local", so DATE
// columns (like challenges.start_date) come back as plain "YYYY-MM-DD"
// strings already in local time. Parsing that string with `new Date()`
// or converting "now" with `toISOString()` both go through UTC, which
// can silently land on the wrong calendar day depending on the time
// of day and your server's UTC offset. These two helpers stay in
// local time throughout instead.

// "YYYY-MM-DD" string -> local midnight Date object
const parseLocalDateString = (dateStr) => {

  const [year, month, day] = String(dateStr)
    .slice(0, 10)
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);

};

// Date object -> "YYYY-MM-DD" in local time (never UTC)
const toLocalDateString = (dateObj) => {

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;

};


// Which day number (1-90) a given date falls on relative to the
// challenge's start date. Returns null if outside the 90-day window.

const dayNumberFor = (startDate, dateObj) => {

  const start = parseLocalDateString(startDate);
  start.setHours(0, 0, 0, 0);

  const target = new Date(dateObj);
  target.setHours(0, 0, 0, 0);

  const diffDays =
    Math.round((target - start) / 86400000) + 1;

  if (diffDays < 1 || diffDays > 90) {
    return null;
  }

  return diffDays;

};


// Layers a user's saved overrides (custom label/detail) on top of the
// fixed ROUTINE_TASKS list. Start/end times never come from overrides —
// those stay fixed because the notification poller relies on them.

const mergeRoutineTasks = (overrides) => {

  const overrideMap = new Map(
    overrides.map((row) => [row.task_id, row])
  );

  return ROUTINE_TASKS.map((task) => {

    const override = overrideMap.get(task.id);

    return {
      ...task,
      label: override?.label || task.label,
      detail: override?.detail || task.detail,
    };

  });

};


// yyyy-mm-dd + daysToAdd -> new yyyy-mm-dd, all in local time

const addDaysToDateString = (dateStr, daysToAdd) => {

  const date = parseLocalDateString(dateStr);
  date.setDate(date.getDate() + daysToAdd);

  return toLocalDateString(date);

};


// Builds the 12 (or however many) schedule rows for one specific day

const buildDayRows = (userId, challengeId, dayNumber, dateStr, tasks) => {

  return tasks.map((task) => [
    userId,                          // user_id
    task.label,                      // title
    task.detail,                     // task
    "Challenge",                     // category
    "Medium",                        // priority
    dateStr,                         // date
    `${task.start}:00`,              // time
    task.subTasks
      ? `${task.detail} — ${task.subTasks.join(", ")}`
      : task.detail,                 // description
    0,                                // repeat_task
    null,                             // repeat_until
    1,                                // reminder (so it appears in
                                       // Upcoming Reminders and fires a
                                       // start notification through
                                       // your existing reminder poller)
    0,                                // reminder_sent
    challengeId,                      // challenge_id
    dayNumber,                        // challenge_day
    task.id,                          // task_id (survives label edits)
  ]);

};


// The core fix: only ever generate the days that have actually
// arrived. Called on every getChallenge / notice-poll check, so the
// moment a new calendar day begins, that day's 12 tasks get created —
// and not a single day before that. If the app was closed across
// several real days, this backfills every day in between so there's
// no gap, instead of only ever creating "today".

const ensureDaysGenerated = async (userId, challenge, todayDayNumber) => {

  if (!todayDayNumber) {
    return;
  }

  const maxGeneratedDay = await getMaxGeneratedDay(challenge.id);

  if (maxGeneratedDay >= todayDayNumber) {
    return; // already up to date, nothing to do
  }

  const overrides = await getRoutineOverrides(userId);
  const tasks = mergeRoutineTasks(overrides);

  const rows = [];

  for (let day = maxGeneratedDay + 1; day <= todayDayNumber; day++) {

    const dateStr = addDaysToDateString(challenge.start_date, day - 1);

    rows.push(...buildDayRows(userId, challenge.id, day, dateStr, tasks));

  }

  await insertChallengeSchedules(rows);

};


// START — creates the challenge, then generates ONLY Day 1's tasks as
// real rows in your existing `schedules` table (later days appear on
// their own via ensureDaysGenerated). This is what makes them show up
// in My Schedule, the dashboard stat cards, and your existing reminder
// poller automatically — no separate system needed.

export const startChallenge = async (req, res) => {

  try {

    const { start_date } = req.body;

    if (!start_date) {
      return res.status(400).json({
        success: false,
        message: "start_date is required",
      });
    }

    const challengeId = await createChallenge(
      req.user.id,
      start_date
    );

    const todayDayNumber = dayNumberFor(start_date, new Date());

    await ensureDaysGenerated(
      req.user.id,
      { id: challengeId, start_date },
      todayDayNumber || 1
    );

    res.json({
      success: true,
      challengeId,
    });

  } catch (error) {

    console.log("Start challenge error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to start challenge",
    });

  }

};


// DELETE the active challenge — cascades to remove every schedule row
// and note that belonged to it, via the foreign keys in the migration.

export const removeChallenge = async (req, res) => {

  try {

    const challenge = await getActiveChallenge(req.user.id);

    if (!challenge) {
      return res.status(400).json({
        success: false,
        message: "No active challenge to delete",
      });
    }

    await deleteChallenge(challenge.id, req.user.id);

    res.json({ success: true });

  } catch (error) {

    console.log("Delete challenge error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete challenge",
    });

  }

};


// GET (current challenge + per-day progress + today's task checklist)

export const getChallenge = async (req, res) => {

  try {

    const challenge = await getActiveChallenge(req.user.id);

    if (!challenge) {
      return res.json({
        success: true,
        challenge: null,
      });
    }

    const todayDayNumber = dayNumberFor(
      challenge.start_date,
      new Date()
    );

    await ensureDaysGenerated(req.user.id, challenge, todayDayNumber);

    const dayStats = await getChallengeDayStats(challenge.id);

    // A day counts as complete only once every one of its tasks is
    // Completed — this is derived fresh from the schedule rows every
    // time, so there's nothing separate to fall out of sync.
    const completedDays = dayStats
      .filter((day) => day.total > 0 && day.completed === day.total)
      .map((day) => day.dayNumber);

    const todayTasks = todayDayNumber
      ? await getDayTasks(challenge.id, todayDayNumber)
      : [];

    res.json({
      success: true,
      challenge: {
        id: challenge.id,
        startDate: challenge.start_date,
        completedDays,
        todayDayNumber,
        todayTasks,
      },
    });

  } catch (error) {

    console.log("Get challenge error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load challenge",
    });

  }

};


// GET one day's full detail: its tasks + saved note. Used when the
// person clicks any circle in the 90-day tracker.

export const getDayDetail = async (req, res) => {

  try {

    const challenge = await getActiveChallenge(req.user.id);

    if (!challenge) {
      return res.status(400).json({
        success: false,
        message: "No active challenge",
      });
    }

    const dayNumber = Number(req.params.dayNumber);

    if (!dayNumber || dayNumber < 1 || dayNumber > 90) {
      return res.status(400).json({
        success: false,
        message: "Invalid day number",
      });
    }

    const todayDayNumber = dayNumberFor(
      challenge.start_date,
      new Date()
    );

    if (!todayDayNumber || dayNumber > todayDayNumber) {
      return res.status(403).json({
        success: false,
        message: `Day ${dayNumber} isn't accessible yet — it unlocks once Day ${dayNumber} actually begins.`,
      });
    }

    const tasks = await getDayTasks(challenge.id, dayNumber);
    const note = await getDayNote(challenge.id, dayNumber);

    res.json({
      success: true,
      day: {
        dayNumber,
        date: tasks[0]?.date || null,
        tasks,
        note,
      },
    });

  } catch (error) {

    console.log("Get day detail error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load that day",
    });

  }

};


// SAVE a day's "what I learned" note — editable any time, not locked

export const saveDayNote = async (req, res) => {

  try {

    const challenge = await getActiveChallenge(req.user.id);

    if (!challenge) {
      return res.status(400).json({
        success: false,
        message: "No active challenge",
      });
    }

    const dayNumber = Number(req.params.dayNumber);
    const { note } = req.body;

    if (!dayNumber || dayNumber < 1 || dayNumber > 90) {
      return res.status(400).json({
        success: false,
        message: "Invalid day number",
      });
    }

    const todayDayNumber = dayNumberFor(
      challenge.start_date,
      new Date()
    );

    if (!todayDayNumber || dayNumber > todayDayNumber) {
      return res.status(403).json({
        success: false,
        message: `Day ${dayNumber} isn't accessible yet.`,
      });
    }

    await upsertDayNote(
      req.user.id,
      challenge.id,
      dayNumber,
      note || ""
    );

    res.json({ success: true });

  } catch (error) {

    console.log("Save day note error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save note",
    });

  }

};


// GET every saved note for the "Saved Notes" section of the Challenge
// page — Day 1, Day 2, etc., only the days that actually have a note.

export const getNotesList = async (req, res) => {

  try {

    const challenge = await getActiveChallenge(req.user.id);

    if (!challenge) {
      return res.json({
        success: true,
        notes: [],
      });
    }

    const notes = await getAllNotes(challenge.id);

    res.json({
      success: true,
      notes,
    });

  } catch (error) {

    console.log("Get notes list error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load notes",
    });

  }

};


// GET the routine tasks, with this user's edits applied — this is the
// template shown on the Challenge page before a challenge starts /
// for the next one. It doesn't touch schedules already generated.

export const getRoutineTasks = async (req, res) => {

  try {

    const overrides = await getRoutineOverrides(req.user.id);

    res.json({
      success: true,
      tasks: mergeRoutineTasks(overrides),
    });

  } catch (error) {

    console.log("Get routine tasks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load routine tasks",
    });

  }

};


// EDIT a task's name/description (times are fixed, not editable here)

export const updateRoutineTask = async (req, res) => {

  try {

    const { taskId } = req.params;
    const { label, detail } = req.body;

    const taskExists = ROUTINE_TASKS.some((task) => task.id === taskId);

    if (!taskExists) {
      return res.status(404).json({
        success: false,
        message: "Unknown task",
      });
    }

    if (!label || !label.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task name is required",
      });
    }

    await upsertRoutineOverride(
      req.user.id,
      taskId,
      label.trim(),
      (detail || "").trim()
    );

    res.json({ success: true });

  } catch (error) {

    console.log("Update routine task error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save task",
    });

  }

};


// DUE ROUTINE NOTICES — polled by the frontend every few seconds.
// Only the "end of task, here's what's next" ping lives here now —
// the "task started" ping is already covered automatically, because
// each generated schedule has reminder=1 and your existing reminder
// poller (/schedules/reminders) fires for it at task.start. Doing the
// start ping here too would fire it twice.

export const getDueRoutineNotices = async (req, res) => {

  try {

    const challenge = await getActiveChallenge(req.user.id);

    if (!challenge) {
      return res.json({
        success: true,
        notices: [],
      });
    }

    const now = new Date();

    const todayDayNumber = dayNumberFor(
      challenge.start_date,
      now
    );

    if (!todayDayNumber) {
      return res.json({
        success: true,
        notices: [],
      });
    }

    await ensureDaysGenerated(req.user.id, challenge, todayDayNumber);

    const todayStr = toLocalDateString(now);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const overrides = await getRoutineOverrides(req.user.id);
    const tasks = mergeRoutineTasks(overrides);

    const notices = [];

    for (let i = 0; i < tasks.length; i++) {

      const task = tasks[i];
      const next = tasks[i + 1];

      const [endH, endM] = task.end.split(":").map(Number);
      const endMinutes = endH * 60 + endM;

      // 5-minute firing window, matching the tolerance already used
      // by the schedule reminder poller

      if (
        nowMinutes >= endMinutes &&
        nowMinutes <= endMinutes + 5
      ) {

        const alreadySent = await hasNoticeBeenSent(
          req.user.id,
          todayStr,
          task.id,
          "end"
        );

        if (!alreadySent) {
          notices.push({
            taskId: task.id,
            type: "end",
            title: `${task.label} — done!`,
            message: next
              ? `${task.label} is done. Next up: ${next.label}.`
              : `${task.label} is done. That's the last task for today — nice work!`,
          });
        }

      }

    }

    for (const notice of notices) {

      await createNotification({
        user_id: req.user.id,
        title: notice.title,
        message: notice.message,
        type: "challenge",
      });

      await markNoticeSent(
        req.user.id,
        todayStr,
        notice.taskId,
        notice.type
      );

    }

    res.json({
      success: true,
      notices,
    });

  } catch (error) {

    console.log("Due routine notices error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to check routine notices",
    });

  }

};