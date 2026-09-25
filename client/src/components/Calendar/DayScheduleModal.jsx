import {X,Plus} from "lucide-react";
import {Link} from "react-router-dom";


function DayScheduleModal({
selectedDay,
schedules,
onClose
}){


if(!selectedDay)
return null;




const daySchedules=schedules.filter(
(item)=>
new Date(item.date)
.toDateString()
===
selectedDay.toDateString()
);





return(

<div className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
">


<div className="
w-full
max-w-md
bg-white
dark:bg-slate-900
rounded-2xl
p-6
">


<div className="
flex
justify-between
mb-5
">


<h2 className="text-xl font-bold">

{selectedDay.toDateString()}

</h2>


<button onClick={onClose}>

<X/>

</button>


</div>






{

daySchedules.length===0

?

<p className="opacity-60">

No schedules

</p>


:

<div className="space-y-3">


{

daySchedules.map(item=>(


<Link

key={item.id}

to={`/schedule/${item.id}`}

className="
block
p-4
rounded-xl
bg-slate-100
dark:bg-slate-800
"

>


<h3 className="font-bold">

{item.title}

</h3>


<p>

{item.task}

</p>


<p className="text-sm opacity-60">

{item.time}

</p>


</Link>



))


}



</div>


}





<Link

to="/schedule/add"

className="
mt-5
flex
justify-center
items-center
gap-2
bg-blue-600
text-white
rounded-xl
py-3
"


>


<Plus size={18}/>

Add Schedule


</Link>



</div>


</div>


);


}


export default DayScheduleModal;