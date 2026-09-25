import db from "../config/db.js";



// Get user streak

export const getStreak = (userId, callback) => {


  db.query(

    `
    SELECT *
    FROM streaks
    WHERE user_id=?
    `,

    [userId],


    (err, result) => {


      if(err){

        return callback(err, null);

      }


      callback(null, result[0]);


    }

  );


};







// Create streak

export const createStreak = (userId, callback) => {


  db.query(

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
      0,
      0,
      null
    ],


    (err,result)=>{


      if(err){

        return callback(err,null);

      }


      callback(null,result);


    }

  );


};








// Update streak

export const updateStreak = (

  userId,

  current,

  longest,

  date,

  callback

)=>{


  db.query(

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

      date,

      userId

    ],



    (err,result)=>{


      if(err){

        return callback(err,null);

      }


      callback(null,result);


    }

  );


};