import { useEffect, useState } from "react";
import api from "../../services/api";
import { useTheme } from "../../Context/ThemeContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function TaskCharts() {

  const { darkMode } = useTheme();

  const [data, setData] = useState([]);


  useEffect(() => {

    fetchChartData();

  }, []);



  const fetchChartData = async () => {

    try {

      const response = await api.get("/dashboard/stats");

      const stats = response.data.stats;


      setData([
        {
          name: "Total",
          value: Number(stats.totalTasks) || 0,
        },
        {
          name: "Completed",
          value: Number(stats.completedTasks) || 0,
        },
        {
          name: "Pending",
          value: Number(stats.pendingTasks) || 0,
        },
        {
          name: "High",
          value: Number(stats.highPriority) || 0,
        },
      ]);


    } catch (error) {

      console.log(
        "Chart Error:",
        error
      );

    }

  };



  return (

    <section
      className={`max-w-7xl mx-auto mt-8 rounded-3xl p-6 ${
        darkMode
          ? "bg-slate-900 border border-slate-800"
          : "bg-white shadow-lg"
      }`}
    >


      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Task Analytics
        </h2>


        <span
          className={`text-sm ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Overview of your tasks
        </span>


      </div>



      {/* Chart */}

      <div
        style={{
          width: "100%",
          height: 350,
        }}
      >

        <ResponsiveContainer>


          <BarChart data={data}>


            <CartesianGrid
              stroke={
                darkMode
                  ? "#1E293B"
                  : "#E2E8F0"
              }
              strokeDasharray="3 3"
            />



            <XAxis

              dataKey="name"

              tick={{
                fill: darkMode
                  ? "#94A3B8"
                  : "#64748B",

                fontSize: 12,
              }}

              axisLine={false}

              tickLine={false}

            />



            <YAxis

              allowDecimals={false}

              tick={{
                fill: darkMode
                  ? "#94A3B8"
                  : "#64748B",

                fontSize: 12,
              }}

              axisLine={false}

              tickLine={false}

            />



            <Tooltip

              contentStyle={{

                background: darkMode
                  ? "#0F172A"
                  : "#FFFFFF",

                border:
                  "1px solid #334155",

                borderRadius:
                  "12px",

                color: darkMode
                  ? "#F8FAFC"
                  : "#0F172A",

              }}

            />



            <Bar

              dataKey="value"

              fill="#2563EB"

              radius={[
                8,
                8,
                0,
                0
              ]}

              barSize={35}

            />


          </BarChart>


        </ResponsiveContainer>


      </div>



    </section>

  );

}


export default TaskCharts;