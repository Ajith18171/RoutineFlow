import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./config/db.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/schedules", scheduleRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/streak", streakRoutes);

app.use("/api/reports", reportRoutes);

app.use(
"/api/notifications",
notificationRoutes
);

app.use(
"/api/challenge",
challengeRoutes
);

// Test route
app.get("/", (req, res) => {
  res.send("RoutineFlow Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
