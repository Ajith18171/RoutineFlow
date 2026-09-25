import {
getNotifications,
createNotification,
markRead,
deleteNotification
} from "../models/notificationModel.js";



// GET

export const getUserNotifications = async(req,res)=>{

try{

const notifications =
await getNotifications(
req.user.id
);


res.json({

success:true,

notifications

});


}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Notification error"

});


}

};




// CREATE

export const createUserNotification = async(req,res)=>{

try{


const result =
await createNotification({

user_id:req.user.id,

title:req.body.title,

message:req.body.message,

type:req.body.type || "system"

});



res.status(201).json({

success:true,

message:"Notification created",

id:result.insertId

});


}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Notification creation failed"

});


}

};




// READ

export const readNotification = async(req,res)=>{

try{


await markRead(

req.params.id,

req.user.id

);



res.json({

success:true,

message:"Marked read"

});


}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Read failed"

});


}

};




// DELETE

export const removeNotification = async(req,res)=>{

try{


await deleteNotification(

req.params.id,

req.user.id

);



res.json({

success:true,

message:"Deleted"

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