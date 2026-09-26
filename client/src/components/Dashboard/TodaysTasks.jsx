import { useEffect, useState } from "react";

import api from "../../services/api";

import { useTheme } from "../../Context/ThemeContext";

import {
  CalendarDays,
  Clock,
  CheckCircle2,
} from "lucide-react";


// Same accent map as DashboardCards.jsx
const PRIORITY_ACCENT = {
  High: "#F43F5E",
  Medium: "#F59E0B",
  Low: "#10B981",
};


function TodaysTasks({
  refreshKey,
}) {

  const { darkMode } = useTheme();

  const [tasks, setTasks] = useState([]);


  // ==========================
  // FETCH TODAY'S TASKS
  // ==========================

  const fetchTodayTasks = async () => {

    try {

      const response = await api.get(
        "/schedules"
      );


      const today =
        new Date().toLocaleDateString(
          "en-CA"
        );


      const todayTasks =
        response.data.schedules.filter(
          (schedule) => {

            const scheduleDate =
              typeof schedule.date === "string"
                ? schedule.date.split("T")[0]
                : "";


            return scheduleDate === today;

          }
        );


      setTasks(todayTasks);

    } catch (error) {

      console.log(
        error.response?.data || error
      );

    }

  };


  // ==========================
  // LOAD + REFRESH
  // ==========================

  useEffect(() => {

    fetchTodayTasks();

  }, [refreshKey]);


  // ==========================
  // RETURN
  // ==========================

  return (

    <section
      className={`h-full rounded-2xl p-6 ${
        darkMode
          ? "bg-slate-900 border border-slate-800"
          : "bg-white border border-slate-200/70 shadow-sm"
      }`}
    >

      {/* Header */}

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-2.5">

          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              darkMode
                ? "bg-indigo-500/15"
                : "bg-indigo-50"
            }`}
          >

            <CalendarDays
              size={18}
              className="text-indigo-500"
            />

          </div>


          <div>

            <h2
              className={`text-lg font-bold leading-tight ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Today's Tasks
            </h2>


            <p
              className={`text-xs ${
                darkMode
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              {tasks.length} scheduled for today
            </p>

          </div>

        </div>

      </div>


      {/* Empty */}

      {tasks.length === 0 ? (

        <div className="text-center py-10">

          <p
            className={`text-sm ${
              darkMode
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            Nothing on the calendar for today.
            Enjoy the clear day.
          </p>

        </div>

      ) : (

        <div className="space-y-2.5">

          {tasks.map((task) => {

            const isDone =
              ["complete", "completed"].includes(
                task.status
                  ?.toLowerCase()
                  .trim()
              );


            const accent =
              PRIORITY_ACCENT[
                task.priority
              ] || "#94A3B8";


            return (

              <div
                key={task.id}
                className={`
                  relative overflow-hidden
                  flex justify-between items-center
                  rounded-xl pl-4 pr-4 py-3.5
                  transition
                  ${
                    darkMode
                      ? "bg-slate-950 hover:bg-slate-800/60"
                      : "bg-slate-50 hover:bg-slate-100/80"
                  }
                `}
              >

                {/* Priority Accent */}

                <div
                  className="absolute left-0 top-0 h-full w-[3px]"
                  style={{
                    backgroundColor: accent,
                  }}
                />


                {/* Task Info */}

                <div className="min-w-0">

                  <h3
                    className={`font-semibold truncate ${
                      isDone
                        ? darkMode
                          ? "text-slate-500 line-through"
                          : "text-slate-400 line-through"
                        : darkMode
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {task.title}
                  </h3>


                  <p
                    className={`text-sm truncate mt-0.5 ${
                      darkMode
                        ? "text-slate-500"
                        : "text-slate-500"
                    }`}
                  >
                    {task.task}
                  </p>

                </div>


                {/* Time + Status */}

                <div className="text-right shrink-0 pl-4">

                  <div
                    className={`flex items-center justify-end gap-1.5 text-sm ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >

                    <Clock size={14} />

                    {task.time}

                  </div>


                  <span
                    className="
                      inline-flex items-center gap-1
                      mt-2 px-2.5 py-1
                      rounded-full text-xs font-medium
                    "
                    style={
                      isDone
                        ? {
                            backgroundColor:
                              "rgba(16, 185, 129, 0.12)",
                            color: "#10B981",
                          }
                        : {
                            backgroundColor:
                              "rgba(245, 158, 11, 0.12)",
                            color: "#F59E0B",
                          }
                    }
                  >

                    {isDone && (
                      <CheckCircle2 size={12} />
                    )}

                    {task.status}

                  </span>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </section>

  );

}


export default TodaysTasks;
