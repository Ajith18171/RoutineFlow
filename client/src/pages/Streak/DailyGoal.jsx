import ProgressRing from "./ProgressRing";


function DailyGoal({

completed = 0,
total = 10

}) {


const progress =
Math.round(
(completed / total) * 100
);



return (

<div
className="
rounded-3xl
bg-white
dark:bg-slate-900
p-6
shadow-lg
"
>


<h2 className="text-xl font-bold mb-5">

Today's Goal

</h2>


<div className="flex justify-center">

<ProgressRing
progress={progress}
/>

</div>


<p
className="
text-center
mt-4
text-gray-500
"
>

{completed} / {total} Tasks Completed

</p>


</div>

);

}


export default DailyGoal;