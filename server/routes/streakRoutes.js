import express from "express";

import {
  getUserStreak
} from "../controllers/streakController.js";


import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();



router.get(
  "/",
  authMiddleware,
  getUserStreak
);



export default router;