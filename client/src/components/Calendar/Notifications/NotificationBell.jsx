import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import api from "../../services/api";
import { useTheme } from "../../Context/ThemeContext";


function NotificationBell(){

const { darkMode } = useTheme();

const [notifications,setNotifications] = useState([]);


useEffect(()=>{

fetchNotifications();

},[]);



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
"Notification Error:",
error
);

}

};




return (

<div className="relative">


<button

className={`

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
notifications.length > 0 &&

(

<span

className="

absolute

-top-1

-right-1

bg-red-600

text-white

text-xs

w-5

h-5

rounded-full

flex

items-center

justify-center

"

>

{notifications.length}

</span>

)

}



</button>


</div>

);


}


export default NotificationBell;