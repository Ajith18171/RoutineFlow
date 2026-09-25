import { useEffect, useState } from "react";

import api from "../../services/api";

import { useTheme } from "../../context/ThemeContext";

import {
  Bell,
  Clock,
} from "lucide-react";


const PRIORITY_ACCENT = {
  High: "#F43F5E",
  Medium: "#F59E0B",
  Low: "#10B981",
};


// ==========================
// FORMAT DATE / TIME
// ==========================

function formatWhen(
  dateStr,
  timeStr
) {

  if (!dateStr) {
    return "";
  }


  const target =
    new Date(
      dateStr.split("T")[0]
    );


  const today =
    new Date();


  today.setHours(
    0,
    0,
    0,
    0
  );


  const diffDays =
    Math.round(
      (target - today) /
      (1000 * 60 * 60 * 24)
    );


  const [hour, minute] =
    (timeStr || "0:0").split(":");


  const displayHour =
    ((Number(hour) + 11) % 12) + 1;


  const ampm =
    Number(hour) >= 12
      ? "PM"
      : "AM";


  const timeLabel =
    `${displayHour}:${minute} ${ampm}`;


  if (diffDays === 0) {

    return `Today, ${timeLabel}`;

  }


  if (diffDays === 1) {

    return `Tomorrow, ${timeLabel}`;

  }


  return `${target.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  )}, ${timeLabel}`;

}


// ==========================
// COMPONENT
// ==========================

function UpcomingReminders({
  refreshKey,
}) {

  const { darkMode } =
    useTheme();


  const [reminders, setReminders] =
    useState([]);


  // ==========================
  // FETCH REMINDERS
  // ==========================

  const fetchReminders =
    async () => {

      try {

        const response =
          await api.get(
            "/schedules/reminders/upcoming"
          );


        setReminders(
          response.data.reminders || []
        );

      } catch (error) {

        console.log(
          error.response?.data ||
          error
        );

      }

    };


  // ==========================
  // LOAD + REFRESH
  // ==========================

  useEffect(() => {

    fetchReminders();

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

      <div className="flex items-center gap-2.5 mb-5">

        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            darkMode
              ? "bg-indigo-500/15"
              : "bg-indigo-50"
          }`}
        >

          <Bell
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
            Upcoming Reminders
          </h2>


          <p
            className={`text-xs ${
              darkMode
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            Your planned reminder tasks
          </p>

        </div>

      </div>


      {/* Empty */}

      {reminders.length === 0 ? (

        <div className="text-center py-10">

          <p
            className={`text-sm ${
              darkMode
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            No reminders on the horizon.
          </p>

        </div>

      ) : (

        <div className="space-y-2.5">

          {reminders.map((item) => {

            const accent =
              PRIORITY_ACCENT[
                item.priority
              ] || "#94A3B8";


            return (

              <div
                key={item.id}
                className={`
                  relative overflow-hidden
                  rounded-xl pl-4 pr-4 py-3.5
                  flex justify-between items-center
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
                    backgroundColor:
                      accent,
                  }}
                />


                {/* Task */}

                <div className="min-w-0">

                  <h3
                    className={`font-semibold truncate ${
                      darkMode
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {item.title}
                  </h3>


                  <p
                    className={`text-sm truncate mt-0.5 ${
                      darkMode
                        ? "text-slate-500"
                        : "text-slate-500"
                    }`}
                  >
                    {item.task}
                  </p>

                </div>


                {/* Reminder Time */}

                <div className="text-right shrink-0 pl-4">

                  <span
                    className="
                      inline-flex items-center gap-1.5
                      px-2.5 py-1
                      rounded-full text-xs font-medium
                      whitespace-nowrap
                    "
                    style={{
                      backgroundColor:
                        "rgba(79, 70, 229, 0.12)",
                      color: "#4F46E5",
                    }}
                  >

                    <Clock size={12} />

                    {formatWhen(
                      item.date,
                      item.time
                    )}

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


export default UpcomingReminders;
