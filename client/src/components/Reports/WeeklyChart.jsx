import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid
} from "recharts";

import { BarChart3 } from "lucide-react";
import {useTheme} from "../../context/ThemeContext";


function WeeklyChart({data=[]}){

const {darkMode}=useTheme();

const gridColor = darkMode ? "#1e293b" : "#e2e8f0";
const axisColor = darkMode ? "#64748b" : "#94a3b8";


return (

<section className={`p-6 rounded-2xl ${
darkMode
?"bg-slate-900 border border-slate-800"
:"bg-white border border-slate-200/70 shadow-sm"
}`}>

<div className="flex items-center gap-2.5 mb-5">

  <div
    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
      darkMode ? "bg-indigo-500/15" : "bg-indigo-50"
    }`}
  >
    <BarChart3 size={18} className="text-indigo-500" />
  </div>

  <h2 className={`text-lg font-bold ${
    darkMode ? "text-white" : "text-slate-900"
  }`}>
    Weekly Productivity
  </h2>

</div>


<div style={{width:"100%",height:300}}>

<ResponsiveContainer>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

<XAxis
  dataKey="day"
  stroke={axisColor}
  tick={{ fill: axisColor, fontSize: 12 }}
  axisLine={{ stroke: gridColor }}
  tickLine={false}
/>

<YAxis
  stroke={axisColor}
  tick={{ fill: axisColor, fontSize: 12 }}
  axisLine={false}
  tickLine={false}
  allowDecimals={false}
/>

<Tooltip
  contentStyle={{
    backgroundColor: darkMode ? "#020617" : "#ffffff",
    border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
    borderRadius: "12px",
    color: darkMode ? "#f1f5f9" : "#0f172a",
    fontSize: "13px",
  }}
  cursor={{ fill: darkMode ? "rgba(79,70,229,0.08)" : "rgba(79,70,229,0.06)" }}
/>


<Bar
dataKey="total"
fill="#4F46E5"
radius={[6, 6, 0, 0]}
maxBarSize={40}
/>


</BarChart>

</ResponsiveContainer>


</div>


</section>

);


}


export default WeeklyChart;