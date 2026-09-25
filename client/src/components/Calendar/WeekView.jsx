import EventCard from "./EventCard";


function WeekView({
currentDate,
schedules
}){


const start=new Date(currentDate);


start.setDate(
start.getDate()-start.getDay()
);



const days=[];


for(let i=0;i<7;i++){

const day=new Date(start);

day.setDate(
start.getDate()+i
);


days.push(day);

}




return(

<div className="
grid
grid-cols-7
gap-3
">


{

days.map(day=>{


const events=schedules.filter(
(item)=>
new Date(item.date)
.toDateString()
===
day.toDateString()
);



return(

<div

key={day.toISOString()}

className="
rounded-xl
border
p-3
min-h-[300px]
bg-white
dark:bg-slate-900
"

>


<h3 className="
font-bold
mb-3
text-sm
">

{day.toDateString()}

</h3>



{

events.map(event=>(

<EventCard

key={event.id}

schedule={event}

/>

))

}



</div>


)


})

}



</div>

)


}


export default WeekView;