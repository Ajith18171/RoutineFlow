import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";


import {

addSchedule,

getAllSchedules,

getSingleSchedule,

editSchedule,

removeSchedule,

markScheduleCompleted,

getDashboardStats,

getUpcomingReminders,

getReminderPreview,

markReminderSent


} from "../controllers/scheduleController.js";



const router = express.Router();




// ALL

router.get(
"/",
authMiddleware,
getAllSchedules
);



// STATS

router.get(
"/stats",
authMiddleware,
getDashboardStats
);



// UPCOMING (due-right-now check, used by the notification poller)

router.get(
"/reminders",
authMiddleware,
getUpcomingReminders
);



// UPCOMING PREVIEW (still-ahead reminders, used by the dashboard widget)

router.get(
"/reminders/upcoming",
authMiddleware,
getReminderPreview
);




// SINGLE

router.get(
"/:id",
authMiddleware,
getSingleSchedule
);




// CREATE

router.post(
"/",
authMiddleware,
addSchedule
);




// UPDATE

router.put(
"/:id",
authMiddleware,
editSchedule
);




// MARK REMINDER SENT

router.put(
"/:id/reminder-sent",
authMiddleware,
markReminderSent
);




// COMPLETE

router.patch(
"/:id/complete",
authMiddleware,
markScheduleCompleted
);




// DELETE

router.delete(
"/:id",
authMiddleware,
removeSchedule
);



export default router;