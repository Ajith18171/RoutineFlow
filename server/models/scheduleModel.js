import db from "../config/db.js";


// CREATE SCHEDULE
export const createSchedule = async(data)=>{

const [result] = await db.query(

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
reminder_sent
)

VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
`,

[
data.user_id,
data.title,
data.task,
data.category,
data.priority,
data.date,
data.time,
data.description,
data.repeat_task || 0,
data.repeat_until || null,
data.reminder || 0,
0
]

);


return result;

};


// GET ALL SCHEDULES WITH SEARCH

export const getSchedules = async (
  userId,
  search = "",
  status = "",
  priority = "",
  sort = "newest",
  page = 1,
  limit = 10
) => {

  let query = `
    SELECT *
    FROM schedules
    WHERE user_id = ?
  `;

  const values = [userId];

  if (search) {

    query += `
      AND (
        title LIKE ?
        OR task LIKE ?
        OR category LIKE ?
        OR description LIKE ?
      )
    `;

    const keyword = `%${search}%`;

    values.push(
      keyword,
      keyword,
      keyword,
      keyword
    );

  }

  if (status) {

    query += ` AND status = ? `;
    values.push(status);

  }

  if (priority) {

    query += ` AND priority = ? `;
    values.push(priority);

  }

  switch (sort) {

    case "oldest":
      query += " ORDER BY id ASC";
      break;

    case "date_asc":
      query += " ORDER BY date ASC,time ASC";
      break;

    case "date_desc":
      query += " ORDER BY date DESC,time DESC";
      break;

    case "priority":
      query += `
      ORDER BY FIELD(
        priority,
        'High',
        'Medium',
        'Low'
      )
      `;
      break;

    default:
      query += " ORDER BY id DESC";

  }

  const offset = (page - 1) * limit;

  query += ` LIMIT ? OFFSET ?`;

  values.push(limit, offset);

  const [rows] = await db.query(query, values);

  // Total count

  let countQuery = `
    SELECT COUNT(*) AS total
    FROM schedules
    WHERE user_id = ?
  `;

  const countValues = [userId];

  if (search) {

    countQuery += `
      AND (
        title LIKE ?
        OR task LIKE ?
        OR category LIKE ?
        OR description LIKE ?
      )
    `;

    const keyword = `%${search}%`;

    countValues.push(
      keyword,
      keyword,
      keyword,
      keyword
    );

  }

  if (status) {

    countQuery += " AND status=?";
    countValues.push(status);

  }

  if (priority) {

    countQuery += " AND priority=?";
    countValues.push(priority);

  }

  const [[count]] = await db.query(
    countQuery,
    countValues
  );

  return {

    schedules: rows,

    total: count.total,

    totalPages: Math.ceil(
      count.total / limit
    ),

  };

};





// GET SINGLE

export const getScheduleById = async(id,userId)=>{


const [rows] = await db.query(

`
SELECT *

FROM schedules

WHERE id=?

AND user_id=?
`,

[
id,
userId
]

);


return rows;


};






// UPDATE

export const updateSchedule = async(
id,
userId,
data
)=>{


// Fetch the existing schedule first so we can tell whether the
// reminder-relevant fields (date, time, reminder toggle) actually changed.
// If they didn't change, we must NOT reset reminder_sent, otherwise every
// unrelated edit (title, priority, etc.) re-fires an already-sent reminder.

const [existingRows] = await db.query(

`
SELECT date, time, reminder, reminder_sent

FROM schedules

WHERE id=?

AND user_id=?
`,

[id, userId]

);


const existing = existingRows[0];


let reminderSent = 0;


if (existing) {

  // Normalize for comparison (dates/times can come back as Date objects
  // or strings depending on the driver/column type)
  const sameDate =
    String(existing.date).slice(0, 10) ===
    String(data.date).slice(0, 10);

  const sameTime =
    String(existing.time) === String(data.time);

  const sameReminder =
    Number(existing.reminder) === Number(data.reminder || 0);

  if (sameDate && sameTime && sameReminder) {

    // Nothing reminder-related changed, keep the existing sent state
    reminderSent = existing.reminder_sent;

  }

}


const [result] = await db.query(

`
UPDATE schedules

SET

title=?,

task=?,

category=?,

priority=?,

date=?,

time=?,

description=?,

repeat_task=?,

repeat_until=?,

reminder=?,

reminder_sent=?


WHERE id=?

AND user_id=?

`,

[

data.title,

data.task,

data.category,

data.priority,

data.date,

data.time,

data.description,

data.repeat_task || 0,

data.repeat_until || null,

data.reminder || 0,

reminderSent,

id,

userId

]


);



return result;


};






// DELETE

export const deleteSchedule = async(id,userId)=>{


const [result] = await db.query(

`
DELETE FROM schedules

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






// COMPLETE

export const completeSchedule = async(id,userId)=>{


// Check whether this schedule repeats daily, and if it has an end
// date (repeat_until). Completing it should roll it forward to
// tomorrow and reopen it ONLY if repeat_until is empty (repeat
// forever) or tomorrow still falls on/before repeat_until.
// Once tomorrow would be past repeat_until, it closes out for good.

const [existingRows] = await db.query(

`
SELECT repeat_task, repeat_until, date

FROM schedules

WHERE id=?

AND user_id=?
`,

[id, userId]

);


const existing = existingRows[0];


if (!existing) {

  // Nothing matched id + userId, let the caller 404
  return { affectedRows: 0, repeated: false };

}


const isRepeating = Number(existing.repeat_task) === 1;


if (isRepeating) {

  // Work out tomorrow's date in the same YYYY-MM-DD shape as
  // repeat_until, so the comparison below is a simple string compare
  const currentDate = new Date(existing.date);

  currentDate.setDate(currentDate.getDate() + 1);

  const nextDateStr = currentDate
    .toISOString()
    .slice(0, 10);

  const repeatUntilStr = existing.repeat_until
    ? new Date(existing.repeat_until).toISOString().slice(0, 10)
    : null;

  const stillWithinRange =
    !repeatUntilStr || nextDateStr <= repeatUntilStr;


  if (stillWithinRange) {

    const [result] = await db.query(

    `
    UPDATE schedules

    SET

    status='Pending',

    date=DATE_ADD(date, INTERVAL 1 DAY),

    reminder_sent=0

    WHERE id=?

    AND user_id=?

    `,

    [
    id,
    userId
    ]

    );


    return { ...result, repeated: true };

  }

  // Repeat window has ended — fall through and close it out
  // like a normal, non-repeating schedule below

}


const [result] = await db.query(

`
UPDATE schedules

SET status='Completed'

WHERE id=?

AND user_id=?

`,

[
id,
userId
]

);


return { ...result, repeated: false };


};







// DASHBOARD STATS

export const getScheduleStats = async(userId)=>{


const [rows] = await db.query(

`
SELECT


COUNT(*) AS totalTasks,


SUM(
CASE
WHEN status='Completed'
THEN 1
ELSE 0
END
)
AS completedTasks,


SUM(
CASE
WHEN status='Pending'
THEN 1
ELSE 0
END
)
AS pendingTasks,


SUM(
CASE
WHEN priority='High'
THEN 1
ELSE 0
END
)
AS highPriority


FROM schedules


WHERE user_id=?

`,

[userId]

);



return rows[0];


};







// UPCOMING REMINDERS

// UPCOMING REMINDERS

export const getReminders = async(userId)=>{

const [rows] = await db.query(
`
SELECT
id,
title,
task,
date,
time,
priority,
reminder,
status,
reminder_sent

FROM schedules

WHERE user_id=?
AND reminder=1
AND status='Pending'
AND reminder_sent=0

ORDER BY date ASC,time ASC

LIMIT 20
`,
[userId]
);


console.log(
"REMINDER SQL RESULT:",
rows
);


return rows;

};






// UPCOMING REMINDERS (for dashboard display — anything still ahead
// of right now, not the "due this instant" check the notification
// poller uses via getReadyReminders below)

export const getUpcomingReminderList = async(userId)=>{

const [rows] = await db.query(
`
SELECT
id,
title,
task,
date,
time,
priority,
status

FROM schedules

WHERE user_id=?
AND reminder=1
AND status='Pending'
AND (
  date > CURDATE()
  OR (date = CURDATE() AND time >= CURTIME())
)

ORDER BY date ASC, time ASC

LIMIT 20
`,
[userId]
);


return rows;

};



// READY REMINDERS

export const getReadyReminders = async(userId)=>{


const [rows] = await db.query(

`
SELECT

id,

title,

task,

date,

time


FROM schedules


WHERE user_id=?


AND reminder=1


AND status='Pending'


AND reminder_sent=0


AND DATE(date)=CURDATE()


AND TIME(time)<=CURTIME()

`,

[userId]

);


return rows;


};







// MARK SENT

export const updateReminderSent = async(
id,
userId
)=>{


const [result] = await db.query(

`
UPDATE schedules

SET reminder_sent=1

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