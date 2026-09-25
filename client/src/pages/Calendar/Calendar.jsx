import { useEffect, useState } from "react";

import api from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import CalendarToolbar from "../../components/Calendar/CalendarToolbar";
import CalendarView from "../../components/Calendar/CalendarView";
import WeekView from "../../components/Calendar/WeekView";
import CalendarSidebar from "../../components/Calendar/CalendarSidebar";
import DayScheduleModal from "../../components/Calendar/DayScheduleModal";

import { useTheme } from "../../context/ThemeContext";


function Calendar(){

const {darkMode}=useTheme();


const [sidebarOpen,setSidebarOpen]=useState(false);


const [schedules,setSchedules]=useState([]);


const [loading,setLoading]=useState(true);


const [currentDate,setCurrentDate]=useState(
new Date()
);


const [view,setView]=useState("month");


const [selectedDate,setSelectedDate]=useState(
new Date()
);


const [selectedDay,setSelectedDay]=useState(null);





useEffect(()=>{

fetchSchedules();

},[]);





const fetchSchedules=async()=>{

try{

const response =
await api.get("/schedules");


setSchedules(
response.data.schedules || []
);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};







const handlePrev=()=>{


const date=new Date(currentDate);



if(view==="month"){

date.setMonth(
date.getMonth()-1
);

}

else{

date.setDate(
date.getDate()-7
);

}



setCurrentDate(date);


};







const handleNext=()=>{


const date=new Date(currentDate);



if(view==="month"){

date.setMonth(
date.getMonth()+1
);

}

else{

date.setDate(
date.getDate()+7
);

}



setCurrentDate(date);


};






const handleToday=()=>{

setCurrentDate(
new Date()
);

};







return(


<div
className={`
min-h-screen

${

darkMode

?

"bg-slate-950 text-white"

:

"bg-slate-100 text-gray-900"

}

`}
>


<Navbar

openSidebar={()=>
setSidebarOpen(true)
}

/>



<Sidebar

isOpen={sidebarOpen}

closeSidebar={()=>
setSidebarOpen(false)
}

/>



<main className="
p-6
lg:ml-64
">


<h1 className="
text-4xl
font-bold
mb-2
">

Calendar

</h1>


<p className="opacity-70 mb-6">

Manage your schedules visually.

</p>





<div className="flex items-center justify-between">
  <CalendarToolbar
    currentDate={currentDate}
    onPrev={handlePrev}
    onNext={handleNext}
    onToday={handleToday}
    view={view}
    setView={setView}
  />

  <button
    onClick={() => (window.location.href = "/dashboard")}
    className={`ml-4 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 ${
      darkMode
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }`}
  >
    ← Go to Dashboard
  </button>
</div>





{
loading ?

(

<div className="text-center py-20">

Loading Calendar...

</div>

)

:

(

<div className="
grid
lg:grid-cols-4
gap-6
mt-6
">


<div className="lg:col-span-3">


{

view==="month"

?

<CalendarView

currentDate={currentDate}

schedules={schedules}

onSelectDay={(day)=>{

setSelectedDate(day);

setSelectedDay(day);

}}

/>


:

<WeekView

currentDate={currentDate}

schedules={schedules}

/>


}



</div>





<CalendarSidebar

selectedDate={selectedDate}

schedules={schedules}

/>



</div>

)

}







<DayScheduleModal

selectedDay={selectedDay}

schedules={schedules}

onClose={()=>setSelectedDay(null)}

/>





</main>


</div>


);


}


export default Calendar;