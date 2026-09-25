import EventCard from "./EventCard";

function DayCell({
  date,
  schedules,
  onSelectDay,
}) {


if(!date){

return (

<div
className="
h-[120px]
border
border-slate-200
dark:border-slate-800
bg-gray-50
dark:bg-slate-950
"
/>

);

}




const today = new Date();


const isToday =
date.toDateString()
===
today.toDateString();




const daySchedules =
schedules.filter((schedule)=>{


if(!schedule.date)
return false;



const scheduleDate =
new Date(schedule.date);



return (

scheduleDate.getFullYear()
===
date.getFullYear()

&&

scheduleDate.getMonth()
===
date.getMonth()

&&

scheduleDate.getDate()
===
date.getDate()

);


});




return (

<div

onClick={()=>{
onSelectDay(date);
}}

className="
min-h-[120px]
border
border-slate-200
dark:border-slate-800
p-2
cursor-pointer

bg-white
dark:bg-slate-900

hover:bg-blue-50
dark:hover:bg-slate-800

transition
"


>


<div className="flex justify-between items-center mb-2">


<span

className={`
w-8
h-8
flex
items-center
justify-center
rounded-full
font-semibold

${
isToday

?

"bg-blue-600 text-white"

:

"text-gray-700 dark:text-gray-300"

}

`}

>

{date.getDate()}

</span>





{
daySchedules.length > 0 &&

(

<span

className="
text-xs
bg-blue-600
text-white
px-2
py-1
rounded-full
"

>

{daySchedules.length}

</span>

)

}


</div>





<div className="space-y-1">


{

daySchedules

.slice(0,3)

.map((schedule)=>(


<EventCard

key={schedule.id}

schedule={schedule}

/>


))


}




{

daySchedules.length > 3 &&

(

<p

className="
text-xs
text-gray-500
dark:text-gray-400
"

>

+ {daySchedules.length - 3} more

</p>

)

}



</div>



</div>


);


}

export default DayCell;