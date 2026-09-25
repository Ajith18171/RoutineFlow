import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  startChallenge,
  getChallenge,
  removeChallenge,
  getDayDetail,
  saveDayNote,
  getNotesList,
  getDueRoutineNotices,
  getRoutineTasks,
  updateRoutineTask,
} from "../controllers/challengeController.js";


const router = express.Router();


// GET current challenge + progress + today's tasks

router.get(
  "/",
  authMiddleware,
  getChallenge
);


// START a new 90-day challenge (Day 1's tasks generate immediately;
// later days generate automatically as they arrive)

router.post(
  "/start",
  authMiddleware,
  startChallenge
);


// DELETE the active challenge (removes its generated tasks + notes too)

router.delete(
  "/",
  authMiddleware,
  removeChallenge
);


// GET one day's tasks + note (for the day-detail view). Rejects days
// that haven't started yet.

router.get(
  "/day/:dayNumber",
  authMiddleware,
  getDayDetail
);


// SAVE that day's "what I learned" note

router.put(
  "/day/:dayNumber/note",
  authMiddleware,
  saveDayNote
);


// GET every saved note, Day 1 through however far you've gotten

router.get(
  "/notes",
  authMiddleware,
  getNotesList
);


// GET routine tasks (with this user's custom names applied)

router.get(
  "/routine",
  authMiddleware,
  getRoutineTasks
);


// EDIT a routine task's name/description

router.put(
  "/routine/:taskId",
  authMiddleware,
  updateRoutineTask
);


// Poller: due "task ended, here's what's next" notices

router.get(
  "/routine/due",
  authMiddleware,
  getDueRoutineNotices
);


export default router;