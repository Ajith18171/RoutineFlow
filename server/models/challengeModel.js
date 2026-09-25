import db from "../config/db.js";


// GET the user's current active challenge (there can only be one)

export const getActiveChallenge = async (userId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM challenges
    WHERE user_id = ?
    AND status = 'active'
    ORDER BY id DESC
    LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;

};


// START a new challenge. Any previous active challenge for this user
// is closed out first, so a user can only ever have one running.

export const createChallenge = async (userId, startDate) => {

  await db.query(
    `
    UPDATE challenges
    SET status = 'abandoned'
    WHERE user_id = ?
    AND status = 'active'
    `,
    [userId]
  );

  const [result] = await db.query(
    `
    INSERT INTO challenges (user_id, start_date, status)
    VALUES (?, ?, 'active')
    `,
    [userId, startDate]
  );

  return result.insertId;

};


// DELETE the user's active challenge. ON DELETE CASCADE on
// schedules.challenge_id and challenge_day_notes.challenge_id means
// this also removes every schedule row and note that belonged to it.

export const deleteChallenge = async (challengeId, userId) => {

  const [result] = await db.query(
    `
    DELETE FROM challenges
    WHERE id = ?
    AND user_id = ?
    `,
    [challengeId, userId]
  );

  return result;

};


// Bulk-create the 90 x N schedule rows for a freshly started challenge.
// `rows` is an array of arrays matching the column order below —
// built once in the controller from ROUTINE_TASKS + the start date.

export const insertChallengeSchedules = async (rows) => {

  if (rows.length === 0) {
    return;
  }

  await db.query(
    `
    INSERT INTO schedules
    (
      user_id,
      title,
      task,
      category,
      priority,
      date,
      time,
      description,
      repeat_task,
      repeat_until,
      reminder,
      reminder_sent,
      challenge_id,
      challenge_day,
      task_id
    )
    VALUES ?
    `,
    [rows]
  );

};


// Per-day completion, derived straight from the schedule rows
// themselves — this is the single source of truth, there's no
// separate "day locked" flag to fall out of sync with it.

export const getChallengeDayStats = async (challengeId) => {

  const [rows] = await db.query(
    `
    SELECT
      challenge_day AS dayNumber,
      COUNT(*) AS total,
      SUM(status = 'Completed') AS completed
    FROM schedules
    WHERE challenge_id = ?
    GROUP BY challenge_day
    `,
    [challengeId]
  );

  return rows.map((row) => ({
    dayNumber: row.dayNumber,
    total: Number(row.total),
    completed: Number(row.completed),
  }));

};


// All the schedule rows (tasks) that belong to one specific day

export const getDayTasks = async (challengeId, dayNumber) => {

  const [rows] = await db.query(
    `
    SELECT id, title, task, time, status, date, task_id
    FROM schedules
    WHERE challenge_id = ?
    AND challenge_day = ?
    ORDER BY time ASC
    `,
    [challengeId, dayNumber]
  );

  return rows;

};


// The saved "what I learned" note for one day, if any

export const getDayNote = async (challengeId, dayNumber) => {

  const [rows] = await db.query(
    `
    SELECT note
    FROM challenge_day_notes
    WHERE challenge_id = ?
    AND day_number = ?
    `,
    [challengeId, dayNumber]
  );

  return rows[0]?.note || "";

};


export const upsertDayNote = async (
  userId,
  challengeId,
  dayNumber,
  note
) => {

  await db.query(
    `
    INSERT INTO challenge_day_notes (user_id, challenge_id, day_number, note)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE note = VALUES(note)
    `,
    [userId, challengeId, dayNumber, note]
  );

};


// How far this challenge's tasks have actually been generated so far.
// 0 means nothing generated yet.

export const getMaxGeneratedDay = async (challengeId) => {

  const [rows] = await db.query(
    `
    SELECT MAX(challenge_day) AS maxDay
    FROM schedules
    WHERE challenge_id = ?
    `,
    [challengeId]
  );

  return rows[0]?.maxDay || 0;

};


// Every day that has a non-empty saved note, oldest first — for the
// "Saved Notes" list on the Challenge page.

export const getAllNotes = async (challengeId) => {

  const [rows] = await db.query(
    `
    SELECT day_number AS dayNumber, note, updated_at AS updatedAt
    FROM challenge_day_notes
    WHERE challenge_id = ?
    AND note IS NOT NULL
    AND note != ''
    ORDER BY day_number ASC
    `,
    [challengeId]
  );

  return rows;

};


// Has this exact routine notice already fired today?

export const hasNoticeBeenSent = async (
  userId,
  noticeDate,
  taskId,
  noticeType
) => {

  const [rows] = await db.query(
    `
    SELECT id
    FROM routine_notifications_sent
    WHERE user_id = ?
    AND notice_date = ?
    AND task_id = ?
    AND notice_type = ?
    `,
    [userId, noticeDate, taskId, noticeType]
  );

  return rows.length > 0;

};


export const markNoticeSent = async (
  userId,
  noticeDate,
  taskId,
  noticeType
) => {

  await db.query(
    `
    INSERT IGNORE INTO routine_notifications_sent
    (user_id, notice_date, task_id, notice_type)
    VALUES (?, ?, ?, ?)
    `,
    [userId, noticeDate, taskId, noticeType]
  );

};


// All of this user's custom task name/description overrides

export const getRoutineOverrides = async (userId) => {

  const [rows] = await db.query(
    `
    SELECT task_id, label, detail
    FROM routine_task_overrides
    WHERE user_id = ?
    `,
    [userId]
  );

  return rows;

};


// Create or update this user's override for one task

export const upsertRoutineOverride = async (
  userId,
  taskId,
  label,
  detail
) => {

  await db.query(
    `
    INSERT INTO routine_task_overrides (user_id, task_id, label, detail)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      label = VALUES(label),
      detail = VALUES(detail)
    `,
    [userId, taskId, label, detail]
  );

};