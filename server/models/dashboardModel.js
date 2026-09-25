import db from "../config/db.js";


// DASHBOARD BASIC STATISTICS

export const getDashboardStatistics = async (userId) => {

  const [rows] = await db.query(
    `
    SELECT

    COUNT(*) AS total,

    SUM(
      CASE
        WHEN status = 'Completed'
        THEN 1
        ELSE 0
      END
    ) AS completed,


    SUM(
      CASE
        WHEN status = 'Pending'
        THEN 1
        ELSE 0
      END
    ) AS pending,


    SUM(
      CASE
        WHEN priority = 'High'
        THEN 1
        ELSE 0
      END
    ) AS highPriority


    FROM schedules

    WHERE user_id = ?

    `,
    [userId]
  );


  return {
    total: Number(rows[0].total) || 0,
    completed: Number(rows[0].completed) || 0,
    pending: Number(rows[0].pending) || 0,
    highPriority: Number(rows[0].highPriority) || 0
  };

};





// DASHBOARD ANALYTICS

export const getDashboardAnalytics = async(userId)=>{


const [weekly] = await db.query(

`
SELECT

DATE_FORMAT(date,'%a') AS day,

COUNT(*) AS total,

SUM(
CASE 
WHEN status='Completed'
THEN 1
ELSE 0
END
) AS completed


FROM schedules


WHERE user_id=?


GROUP BY DATE_FORMAT(date,'%a')


ORDER BY MIN(date)

`,
[userId]

);





const [categories] = await db.query(

`
SELECT

category,

COUNT(*) AS count


FROM schedules


WHERE user_id=?


GROUP BY category

`,
[userId]

);





const [score] = await db.query(

`
SELECT

ROUND(

(
SUM(status='Completed')
/
COUNT(*)
)*100

) AS productivity


FROM schedules


WHERE user_id=?

`,
[userId]

);



return {

weekly: weekly.map(item=>({
    day:item.day,
    total:Number(item.total),
    completed:Number(item.completed)
})),

categories: categories.map(item=>({
    category:item.category,
    count:Number(item.count)
})),

productivity:Number(score[0]?.productivity) || 0

};


};