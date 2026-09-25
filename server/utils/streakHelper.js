import db from "../config/db.js";


export async function updateUserStreak(userId) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const [rows] = await db.query(
    `
    SELECT *
    FROM streaks
    WHERE user_id=?
    `,
    [userId]
  );


  let streak = rows[0];



  // First completion
  if (!streak) {


    await db.query(
      `
      INSERT INTO streaks
      (
        user_id,
        current_streak,
        longest_streak,
        last_completed
      )

      VALUES(?,?,?,?)
      `,
      [
        userId,
        1,
        1,
        today
      ]
    );


    return;

  }





  const lastDate =
    new Date(streak.last_completed);


  const todayDate =
    new Date(today);



  const diff =
    Math.floor(
      (todayDate - lastDate)
      /
      (1000 * 60 * 60 * 24)
    );




  // Already completed today

  if(diff === 0){

    return;

  }




  // Yesterday completion

  if(diff === 1){


    const current =
      streak.current_streak + 1;



    const longest =
      Math.max(
        current,
        streak.longest_streak
      );



    await db.query(

      `
      UPDATE streaks

      SET

      current_streak=?,

      longest_streak=?,

      last_completed=?

      WHERE user_id=?
      `,

      [
        current,
        longest,
        today,
        userId
      ]

    );


  }


  else{


    // Streak reset

    await db.query(

      `
      UPDATE streaks

      SET

      current_streak=1,

      last_completed=?

      WHERE user_id=?
      `,

      [
        today,
        userId
      ]

    );


  }

}