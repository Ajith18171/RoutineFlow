import db from "../config/db.js";


// GET USER NOTIFICATIONS
export const getNotifications = async(userId)=>{

const [rows] = await db.query(
`
SELECT *
FROM notifications
WHERE user_id=?
ORDER BY created_at DESC
LIMIT 20
`,
[userId]
);

return rows;

};



// CREATE NOTIFICATION
export const createNotification = async(data)=>{

const [result] = await db.query(
`
INSERT INTO notifications
(
 user_id,
 title,
 message,
 type
)
VALUES(?,?,?,?)
`,
[
data.user_id,
data.title,
data.message,
data.type || "system"
]
);

return result;

};



// MARK READ
export const markRead = async(id,userId)=>{

const [result] = await db.query(
`
UPDATE notifications
SET is_read=1
WHERE id=?
AND user_id=?
`,
[
id,
userId
]
);

return result;

};



// DELETE NOTIFICATION
export const deleteNotification = async(id,userId)=>{

const [result] = await db.query(
`
DELETE FROM notifications
WHERE id=?
AND user_id=?
`,
[
id,
userId
]
);

return result;

};