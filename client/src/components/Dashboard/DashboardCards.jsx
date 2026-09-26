import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  Flame,
} from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";


function DashboardCards({ stats }) {

  const { darkMode } = useTheme();

  const total = stats?.total || 0;
  const completed = stats?.completed || 0;

  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;


  // Each card carries a consistent accent identity — the same
  // color language used for priority everywhere else in the app —
  // so "red" always means the same thing whether it's a stat card,
  // a task border, or a reminder badge.
  const cards = [

    {
      title: "Total Tasks",
      value: total,
      icon: ClipboardList,
      accent: "#4F46E5",
      accentSoft: "rgba(79, 70, 229, 0.12)",
      caption: "Across all schedules",
    },

    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      accent: "#10B981",
      accentSoft: "rgba(16, 185, 129, 0.12)",
      caption: `${completionRate}% completion rate`,
    },

    {
      title: "Pending",
      value: stats?.pending || 0,
      icon: Clock3,
      accent: "#F59E0B",
      accentSoft: "rgba(245, 158, 11, 0.12)",
      caption: "Still on your plate",
    },

    {
      title: "High Priority",
      value: stats?.highPriority || 0,
      icon: Flame,
      accent: "#F43F5E",
      accentSoft: "rgba(244, 63, 94, 0.12)",
      caption: "Needs attention first",
    },

  ];


  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
        px-6
        max-w-7xl
        mx-auto
      "
    >

      {
        cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                p-5
                transition-all
                duration-300
                hover:-translate-y-0.5
                ${
                  darkMode
                    ? "bg-slate-900 border border-slate-800 hover:border-slate-700"
                    : "bg-white border border-slate-200/70 shadow-sm hover:shadow-md"
                }
              `}
            >

              {/* Left accent bar — the priority-color thread */}
              <div
                className="absolute left-0 top-0 h-full w-1"
                style={{ backgroundColor: card.accent }}
              />

              <div className="flex items-start justify-between pl-2">

                <div>

                  <p
                    className={`text-[13px] font-medium tracking-wide uppercase ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {card.title}
                  </p>

                  <h2
                    className={`text-[2.25rem] leading-tight font-bold mt-1.5 tabular-nums ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {card.value}
                  </h2>

                  <p
                    className={`text-xs mt-1.5 ${
                      darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {card.caption}
                  </p>

                </div>

                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    flex items-center justify-center
                    shrink-0
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  style={{
                    backgroundColor: card.accentSoft,
                    color: card.accent,
                  }}
                >
                  <Icon size={20} strokeWidth={2.25} />
                </div>

              </div>

            </div>

          );

        })
      }

    </div>

  );

}


export default DashboardCards;