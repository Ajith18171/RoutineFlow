import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getDashboardStats,
  getDashboardAnalyticsController
} from "../controllers/dashboardController.js";


const router = express.Router();



// Dashboard Cards

router.get(
  "/stats",
  authMiddleware,
  getDashboardStats
);



// Dashboard Analytics

router.get(
  "/analytics",
  authMiddleware,
  getDashboardAnalyticsController
);



export default router;