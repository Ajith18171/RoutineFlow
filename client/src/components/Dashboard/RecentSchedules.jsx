import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import { useTheme } from "../../Context/ThemeContext";

import {
  History,
  CalendarDays,
  Clock,
  ArrowRight,
  Pencil,
} from "lucide-react";

import { Link } from "react-router-dom";


// Same accent map used across dashboard
const PRIORITY_ACCENT = {
  High: "#F43F5E",
  Medium: "#F59E0B",
  Low: "#10B981",
};


function RecentSchedules({
  refreshKey,
}) {

  const { darkMode } =
    useTheme();


  const navigate =
    useNavigate();


  const [schedules, setSchedules] =
    useState([]);


  // ==========================
  // CHECK COMPLETED
  // ==========================

  const isCompleted =
    (status) => {

      return [
        "complete",
        "completed",
      ].includes(
        status
          ?.toLowerCase()
          .trim()
      );

    };


  // ==========================
  // FETCH RECENT SCHEDULES
  // ==========================

  const fetchRecentSchedules =
    async () => {

      try {

        const response =
          await api.get(
            "/schedules"
          );


        setSchedules(
          (response.data.schedules || [])
            .slice(0, 5)
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };


  // ==========================
  // LOAD + REFRESH
  // ==========================

  useEffect(() => {

    fetchRecentSchedules();

  }, [refreshKey]);


  // ==========================
  // RETURN
  // ==========================

  return (

    <section
      className={`max-w-7xl mx-auto rounded-2xl p-6 transition ${
        darkMode
          ? "bg-slate-900 border border-slate-800"
          : "bg-white border border-slate-200/70 shadow-sm"
      }`}
    >

      {/* Header */}

      <div className="flex justify-between items-center mb-5">

        <div className="flex items-center gap-2.5">

          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              darkMode
                ? "bg-indigo-500/15"
                : "bg-indigo-50"
            }`}
          >

            <History
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
              Recent Schedules
            </h2>


            <p
              className={`text-xs ${
                darkMode
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              Your latest planned activities
            </p>

          </div>

        </div>


        <button
          onClick={() =>
            navigate("/schedule")
          }
          className={`
            flex items-center gap-1.5
            text-sm font-medium
            px-3 py-1.5 rounded-lg
            transition
            ${
              darkMode
                ? "text-indigo-400 hover:bg-indigo-500/10"
                : "text-indigo-600 hover:bg-indigo-50"
            }
          `}
        >

          View all

          <ArrowRight size={15} />

        </button>

      </div>


      {/* Empty */}

      {schedules.length === 0 ? (

        <div className="text-center py-10">

          <h3
            className={`font-semibold ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            No schedules yet
          </h3>


          <p
            className={`text-sm mt-1 ${
              darkMode
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            Create your first schedule
            to see it here.
          </p>

        </div>

      ) : (

        <div className="space-y-2.5">

          {schedules.map(
            (schedule) => {

              const done =
                isCompleted(
                  schedule.status
                );


              const accent =
                PRIORITY_ACCENT[
                  schedule.priority
                ] || "#94A3B8";


              return (

                <div
                  key={schedule.id}
                  className={`relative overflow-hidden rounded-xl pl-5 pr-4 py-4 transition ${
                    darkMode
                      ? "bg-slate-950 hover:bg-slate-800/60"
                      : "bg-slate-50 hover:bg-slate-100/80"
                  }`}
                >

                  {/* Priority Accent */}

                  <div
                    className="absolute left-0 top-0 h-full w-[3px]"
                    style={{
                      backgroundColor:
                        accent,
                    }}
                  />


                  {/* Top */}

                  <div className="flex justify-between items-start gap-4">

                    <div className="min-w-0">

                      <Link
                        to={`/schedule/${schedule.id}`}
                        className={`font-semibold truncate block hover:text-indigo-500 transition ${
                          darkMode
                            ? "text-white"
                            : "text-slate-900"
                        }`}
                      >
                        {schedule.title}
                      </Link>


                      <p
                        className={`text-sm truncate mt-0.5 ${
                          darkMode
                            ? "text-slate-500"
                            : "text-slate-500"
                        }`}
                      >
                        {schedule.task}
                      </p>

                    </div>


                    <span
                      className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                      style={
                        done
                          ? {
                              backgroundColor:
                                "rgba(16, 185, 129, 0.12)",
                              color:
                                "#10B981",
                            }
                          : {
                              backgroundColor:
                                "rgba(245, 158, 11, 0.12)",
                              color:
                                "#F59E0B",
                            }
                      }
                    >
                      {schedule.status}
                    </span>

                  </div>


                  {/* Details */}

                  <div
                    className={`flex flex-wrap items-center gap-4 mt-3 text-xs ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >

                    <div className="flex items-center gap-1.5">

                      <CalendarDays
                        size={13}
                      />

                      {schedule.date?.split(
                        "T"
                      )[0]}

                    </div>


                    <div className="flex items-center gap-1.5">

                      <Clock
                        size={13}
                      />

                      {schedule.time}

                    </div>


                    <div
                      className="flex items-center gap-1.5 font-medium"
                      style={{
                        color: accent,
                      }}
                    >

                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            accent,
                        }}
                      />

                      {schedule.priority}
                      {" "}
                      Priority

                    </div>


                    {!done && (

                      <button
                        onClick={() =>
                          navigate(
                            `/schedule/edit/${schedule.id}`
                          )
                        }
                        className={`flex items-center gap-1.5 ml-auto font-medium transition ${
                          darkMode
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-indigo-600 hover:text-indigo-700"
                        }`}
                      >

                        <Pencil
                          size={13}
                        />

                        Edit

                      </button>

                    )}

                  </div>

                </div>

              );

            }
          )}

        </div>

      )}

    </section>

  );

}


export default RecentSchedules;
