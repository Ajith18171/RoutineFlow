import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;