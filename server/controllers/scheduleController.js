import {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  completeSchedule,
  getScheduleStats,
  getReadyReminders,
  getUpcomingReminderList,
  updateReminderSent
} from "../models/scheduleModel.js";

import {
  updateUserStreak
} from "../utils/streakHelper.js";



// CREATE SCHEDULE

export const addSchedule = async(req,res)=>{

try{

const {
  title,
  task,
  category,
  priority,
  date,
  time,
  description,
  repeat_task,
  repeat_until,
  reminder
}=req.body;


if(!title || !task){

return res.status(400).json({

success:false,

message:"Title and task required"

});

}



const result = await createSchedule({

user_id:req.user.id,

title,
task,
category,
priority,
date,
time,
description,

repeat_task:repeat_task || 0,

repeat_until:repeat_until || null,

reminder:reminder || 0

});



res.status(201).json({

success:true,

message:"Schedule created",

id:result.insertId

});


}
catch(error){

console.log(
"Create schedule error:",
error
);


res.status(500).json({

success:false,

message:"Schedule creation failed"

});


}

};






// GET ALL SCHEDULES

// GET ALL SCHEDULES

export const getAllSchedules = async (req, res) => {
  try {

    const {
      search = "",
      status = "",
      priority = "",
      sort = "newest",
      page = 1,
      limit = 10,
    } = req.query;

    const result = await getSchedules(
      req.user.id,
      search,
      status,
      priority,
      sort,
      Number(page),
      Number(limit)
    );

    res.json({
      success: true,
      schedules: result.schedules,
      totalPages: result.totalPages,
      total: result.total,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch schedules",
    });

  }
};






// GET SINGLE SCHEDULE

export const getSingleSchedule = async(req,res)=>{

try{


const result =
await getScheduleById(

req.params.id,

req.user.id

);



if(result.length===0){

return res.status(404).json({

success:false,

message:"Schedule not found"

});

}



res.json({

success:true,

schedule:result[0]

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Failed to fetch schedule"

});


}

};







// UPDATE SCHEDULE

export const editSchedule = async(req,res)=>{

try{


const result =
await updateSchedule(

req.params.id,

req.user.id,

req.body

);



if(result.affectedRows===0){

return res.status(404).json({

success:false,

message:"Schedule not found"

});

}



res.json({

success:true,

message:"Schedule updated"

});


}
catch(error){


console.log(
"Update error:",
error
);


res.status(500).json({

success:false,

message:"Update failed"

});


}

};







// DELETE SCHEDULE

export const removeSchedule = async(req,res)=>{

try{


const result =
await deleteSchedule(

req.params.id,

req.user.id

);



res.json({

success:true,

message:"Schedule deleted"

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Delete failed"

});


}

};








// COMPLETE SCHEDULE

export const markScheduleCompleted = async(req,res)=>{

try{


const result =
await completeSchedule(

req.params.id,

req.user.id

);



if(result.affectedRows===0){

return res.status(404).json({

success:false,

message:"Schedule not found"

});

}



// Only bump the streak when a task is actually closed out.
// A repeating task rolling forward to tomorrow isn't "completed"
// in the streak sense yet.

if(!result.repeated){

await updateUserStreak(
req.user.id
);

}



res.json({

success:true,

repeated:result.repeated,

message: result.repeated
  ? "Great job! This repeats daily, so it's been rescheduled for tomorrow."
  : "Schedule completed"

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Complete failed"

});


}

};








// DASHBOARD STATS

export const getDashboardStats = async(req,res)=>{

try{


const stats =
await getScheduleStats(
req.user.id
);



res.json({

success:true,

stats

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Stats failed"

});


}

};








// UPCOMING REMINDERS

export const getUpcomingReminders = async(req,res)=>{

try{


const reminders =
await getReadyReminders(
req.user.id
);



res.json({

success:true,

reminders

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Reminder fetch failed"

});


}

};




// REMINDER PREVIEW (dashboard "Upcoming Reminders" widget — shows
// reminders still ahead of right now, unlike getUpcomingReminders
// above which only returns reminders that are due THIS instant for
// the notification poller)

export const getReminderPreview = async(req,res)=>{

try{


const reminders =
await getUpcomingReminderList(
req.user.id
);



res.json({

success:true,

reminders

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Reminder preview failed"

});


}

};








// MARK REMINDER SENT

export const markReminderSent = async(req,res)=>{

try{


const result =
await updateReminderSent(

req.params.id,

req.user.id

);



if(result.affectedRows===0){


return res.status(404).json({

success:false,

message:"Schedule not found"

});


}



res.json({

success:true,

message:"Reminder marked sent"

});


}
catch(error){


console.log(
"Reminder sent error:",
error
);


res.status(500).json({

success:false,

message:"Reminder update failed"

});


}

};