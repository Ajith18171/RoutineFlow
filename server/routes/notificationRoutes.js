import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";


import {

getUserNotifications,

createUserNotification,

readNotification,

removeNotification

} from "../controllers/notificationController.js";



const router = express.Router();



// GET

router.get(
"/",
authMiddleware,
getUserNotifications
);



// CREATE

router.post(
"/create",
authMiddleware,
createUserNotification
);



// READ

router.put(
"/:id/read",
authMiddleware,
readNotification
);



// DELETE

router.delete(
"/:id",
authMiddleware,
removeNotification
);



export default router;