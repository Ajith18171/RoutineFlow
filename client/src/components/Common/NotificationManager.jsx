import { useEffect, useRef } from "react";
import api from "../../services/api";


function NotificationManager(){

const processed = useRef(new Set());


useEffect(()=>{


if("Notification" in window){

Notification.requestPermission();

}


checkReminders();
checkRoutineNotices();


const interval = setInterval(()=>{

checkReminders();
checkRoutineNotices();

},5000);


return ()=>clearInterval(interval);


},[]);



const checkReminders = async()=>{


try{


const response = await api.get(
"/schedules/reminders"
);



const reminders =
response.data.reminders || [];



const now = new Date();



for(const task of reminders){



// Build the real scheduled moment from task.date + task.time,
// instead of assuming "today" — this is what stops a repeating
// task's rolled-forward (tomorrow) reminder from firing the
// instant it's created.

const taskDateTime = new Date(task.date);

const [hour, minute] = task.time.split(":");

taskDateTime.setHours(
  Number(hour),
  Number(minute),
  0,
  0
);



const difference =
(Math.floor(now.getTime()) -
 Math.floor(taskDateTime.getTime())
) / 1000;


const key =
`${task.id}-${task.date}-${task.time}`;



/*
 Trigger:
 0 seconds before/after
 up to 5 minutes late
*/

if(

difference >=0 &&

difference <=300 &&

!processed.current.has(key)

){


processed.current.add(key);



//
// Save notification
//

try{


await api.post(
"/notifications/create",
{

title:"Reminder",

message:
`${task.title} - ${task.task}`,

type:"reminder"

}

);


}
catch(error){

console.log(
"Create notification failed:",
error.response?.data || error
);

}




//
// Browser popup
//

if(
Notification.permission==="granted"
){


new Notification(

"🔔 RoutineFlow Reminder",

{

body:
`${task.title}\n${task.task}`,

icon:"/favicon.ico"

}

);


}





//
// Mark reminder sent
//

try{


await api.put(
`/schedules/${task.id}/reminder-sent`
);



}
catch(error){


console.log(
"Reminder update failed:",
error.response?.data || error
);


}



}



}



}
catch(error){


console.log(
"Reminder checking error:",
error.response?.data || error
);


}



};



// 90 Day Challenge — routine task start/end notices. The backend
// already saves these into the `notifications` table and dedupes
// them, so this just needs to ask "anything due right now?" and pop
// a browser notification for whatever comes back. This runs on any
// device where the user is logged in with the tab open — including
// on mobile if they've opened the site there.

const checkRoutineNotices = async () => {

  try {

    const response = await api.get(
      "/challenge/routine/due"
    );

    const notices = response.data.notices || [];

    for (const notice of notices) {

      if (Notification.permission === "granted") {

        new Notification(
          `🔥 90 Day Challenge — ${notice.title}`,
          {
            body: notice.message,
            icon: "/favicon.ico",
          }
        );

      }

    }

  } catch (error) {

    console.log(
      "Routine notice checking error:",
      error.response?.data || error
    );

  }

};



return null;


}


export default NotificationManager;
