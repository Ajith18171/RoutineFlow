import { useEffect, useState } from "react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

import {
  BarChart3,
  Target,
  TrendingUp
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";


function Analytics(){

const { darkMode } = useTheme();


const [analytics,setAnalytics] = useState({

weekly:[],
categories:[],
productivity:0

});



useEffect(()=>{

fetchAnalytics();

},[]);



const fetchAnalytics = async()=>{

try{

const response =
await api.get("/dashboard/analytics");


setAnalytics(
response.data.analytics
);


}

catch(error){

console.log(
"Analytics Error:",
error
);

}

};



return (

<section

className={`

max-w-7xl

mx-auto

mt-8

rounded-3xl

p-6


${
darkMode

?

"bg-slate-900 border border-slate-800"

:

"bg-white shadow-lg"

}

`}

>


<div className="flex gap-3 items-center mb-6">

<BarChart3 className="text-blue-500"/>

<h2 className="text-2xl font-bold">
Task Analytics
</h2>

</div>





<div className="grid lg:grid-cols-3 gap-6">



{/* Productivity */}

<div

className={`

rounded-2xl

p-5

${
darkMode
?
"bg-slate-950"
:
"bg-gray-100"
}

`}

>


<div className="flex gap-3 items-center">

<TrendingUp className="text-green-500"/>

<h3 className="font-semibold">
Productivity Score
</h3>


</div>



<p className="text-5xl font-bold mt-5 text-blue-500">

{analytics.productivity}%

</p>


</div>






{/* Weekly Chart */}

<div

className={`

rounded-2xl

p-5

${
darkMode
?
"bg-slate-950"
:
"bg-gray-100"
}

`}

>


<h3 className="font-semibold mb-4">

Weekly Completion

</h3>


<ResponsiveContainer width="100%" height={220}>


<BarChart data={analytics.weekly}>


<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>


<Bar
dataKey="completed"
/>


</BarChart>


</ResponsiveContainer>


</div>






{/* Categories */}

<div

className={`

rounded-2xl

p-5

${
darkMode
?
"bg-slate-950"
:
"bg-gray-100"
}

`}

>


<div className="flex gap-3 items-center mb-4">

<Target className="text-purple-500"/>

<h3 className="font-semibold">
Categories
</h3>

</div>



<ResponsiveContainer width="100%" height={220}>


<PieChart>


<Pie

data={analytics.categories}

dataKey="count"

nameKey="category"

outerRadius={80}

>


{

analytics.categories.map((item,index)=>(

<Cell key={index}/>

))

}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>



</div>



</section>


);

}


export default Analytics;