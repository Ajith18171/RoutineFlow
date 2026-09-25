import db from "../config/db.js";

export const getReportStats = async(userId)=>{

const [rows] = await db.query(

`
SELECT

COUNT(*) AS total,

SUM(
CASE WHEN status='Completed'
THEN 1 ELSE 0 END
) AS completed,

SUM(
CASE WHEN status='Pending'
THEN 1 ELSE 0 END
) AS pending,

SUM(
CASE WHEN priority='High'
THEN 1 ELSE 0 END
) AS highPriority

FROM schedules

WHERE user_id=?

`,
[userId]

);


return rows[0];

};



export const getWeeklyReport = async(userId)=>{

  const [rows] = await db.query(
    `
    SELECT

      DAYNAME(date) AS day,

      COUNT(*) AS total

    FROM schedules

    WHERE

      user_id = ?

      AND

      WEEK(date) = WEEK(CURDATE())

      AND

      YEAR(date) = YEAR(CURDATE())

    GROUP BY DAYNAME(date)
    `,
    [userId]
  );

  return rows;

};



export const getMonthlyReport = async(userId)=>{

  const [rows] = await db.query(
    `
    SELECT

      MONTH(date) AS monthNumber,

      MONTHNAME(date) AS month,

      COUNT(*) AS total

    FROM schedules

    WHERE

      user_id = ?

      AND

      YEAR(date) = YEAR(CURDATE())

      AND

      date IS NOT NULL

    GROUP BY

      MONTH(date),
      MONTHNAME(date)

    ORDER BY

      MONTH(date)
    `,
    [userId]
  );

  return rows;

};