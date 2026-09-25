import {
  getStreak
} from "../models/streakModel.js";



export const getUserStreak = (req,res)=>{


const userId = req.user.id;



getStreak(
  userId,

  (err,streak)=>{


    if(err){

      console.log(err);

      return res.status(500).json({

        success:false,

        message:"Failed to fetch streak"

      });

    }




    res.json({

      success:true,


      streak: streak || {

        current_streak:0,

        longest_streak:0,

        last_completed:null

      }

    });



  }

);


};