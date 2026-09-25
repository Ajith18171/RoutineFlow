import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import NotificationDropdown from "./NotificationDropdown";


function NotificationBell() {


const { darkMode } = useTheme();


const [notifications,setNotifications] = useState([]);

const [open,setOpen] = useState(false);





const fetchNotifications = async()=>{


try{


const response = await api.get(
"/notifications"
);



setNotifications(
response.data.notifications || []
);



}
catch(error){


console.log(
"Notification fetch error:",
error
);


}


};





useEffect(()=>{


fetchNotifications();



const interval = setInterval(()=>{


fetchNotifications();



},5000);



return ()=>clearInterval(interval);



},[]);







const deleteNotification = async(id)=>{


try{


await api.delete(
`/notifications/${id}`
);




setNotifications(prev=>{


const updated = prev.filter(
(item)=>item.id !== id
);



if(updated.length === 0){

setOpen(false);

}



return updated;



});



}
catch(error){


console.log(
"Delete notification error:",
error
);


}


};







const unreadCount = notifications.filter(

(item)=>item.is_read === 0

).length;





return (

<div className="relative">



<button

onClick={()=>setOpen(!open)}

className={`

relative

p-2

rounded-lg

transition

${

darkMode

?

"hover:bg-slate-800"

:

"hover:bg-gray-100"

}

`}

>


<Bell size={22}/>



{

unreadCount > 0 &&

(

<span

className="

absolute

-top-1

-right-1

bg-red-600

text-white

text-xs

rounded-full

w-5

h-5

flex

items-center

justify-center

"

>

{unreadCount}

</span>

)

}



</button>





{

open &&

(

<NotificationDropdown

notifications={notifications}

deleteNotification={deleteNotification}

/>

)

}





</div>

);


}


export default NotificationBell;