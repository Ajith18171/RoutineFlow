import { Award, Flame, Trophy } from "lucide-react";


function AchievementCard() {


const achievements = [

{
title:"7 Day Warrior",
description:"Completed tasks for 7 consecutive days",
icon:<Flame size={28}/>
},

{
title:"30 Day Master",
description:"Maintained a 30 day productivity streak",
icon:<Trophy size={28}/>
},

{
title:"Task Champion",
description:"Completed 100 schedules",
icon:<Award size={28}/>
}

];



return (

<div

className="
rounded-3xl
p-6
shadow-lg

bg-white
dark:bg-slate-900

text-gray-900
dark:text-white
"

>


<h2 className="text-xl font-bold mb-5">

🏆 Achievements

</h2>



<div className="grid md:grid-cols-3 gap-4">


{
achievements.map((item,index)=>(


<div

key={index}

className="
rounded-2xl
p-4

bg-slate-100
dark:bg-slate-800

"

>


<div

className="
mb-3
text-orange-500
"

>

{item.icon}

</div>



<h3 className="font-bold">

{item.title}

</h3>


<p

className="
text-sm
text-gray-500
dark:text-gray-400
mt-2
"

>

{item.description}

</p>


</div>


))

}


</div>


</div>

);

}


export default AchievementCard;