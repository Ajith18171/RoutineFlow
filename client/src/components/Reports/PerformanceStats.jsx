import { useTheme } from "../../context/ThemeContext";

import {
  Trophy,
  TrendingUp,
  Target,
  CheckCircle,
} from "lucide-react";


function PerformanceStats({ stats }) {

  const { darkMode } = useTheme();

  const total = stats?.total || 0;
  const completed = stats?.completed || 0;

  // Calculate directly from total/completed instead of trusting a
  // separate completionRate field that the caller might forget to
  // pass — this was previously always 0% if the parent only sent
  // {total, completed, pending, highPriority} (see ReportCards.jsx).
  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;


  const cards = [

    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: Target,
      accent: "#4F46E5",
      accentSoft: "rgba(79, 70, 229, 0.12)",
    },

    {
      title: "Completed Tasks",
      value: completed,
      icon: CheckCircle,
      accent: "#10B981",
      accentSoft: "rgba(16, 185, 129, 0.12)",
    },

    {
      title: "High Priority",
      value: stats?.highPriority || 0,
      icon: Trophy,
      accent: "#F43F5E",
      accentSoft: "rgba(244, 63, 94, 0.12)",
    },

    {
      title: "Overall Progress",
      value:
        completionRate >= 80
        ?
        "Excellent"
        :
        completionRate >= 50
        ?
        "Good"
        :
        "Needs Focus",

      icon: TrendingUp,
      accent: "#F59E0B",
      accentSoft: "rgba(245, 158, 11, 0.12)",
    },

  ];



  return (

    <section

      className={`
        max-w-7xl
        mx-auto
        rounded-2xl
        p-6
        ${
          darkMode
          ?
          "bg-slate-900 border border-slate-800"
          :
          "bg-white border border-slate-200/70 shadow-sm"
        }
      `}

    >


      <h2
        className={`text-lg font-bold mb-5 ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >

        Performance Statistics

      </h2>




      <div
        className="
          grid
          gap-4
          md:grid-cols-2
          lg:grid-cols-4
        "
      >


        {

          cards.map((card)=>{

            const Icon = card.icon;


            return (

              <div

                key={card.title}

                className={`
                  relative overflow-hidden
                  rounded-xl
                  p-5
                  ${
                    darkMode
                    ?
                    "bg-slate-950"
                    :
                    "bg-slate-50"
                  }
                `}

              >

                <div
                  className="absolute left-0 top-0 h-full w-[3px]"
                  style={{ backgroundColor: card.accent }}
                />

                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: card.accentSoft,
                    color: card.accent,
                  }}
                >
                  <Icon size={19} strokeWidth={2.25} />
                </div>


                <p
                  className={`text-xs font-medium ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >

                  {card.title}

                </p>


                <h3
                  className={`text-2xl font-bold mt-1 tabular-nums ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >

                  {card.value}

                </h3>


              </div>

            );

          })

        }


      </div>


    </section>

  );

}


export default PerformanceStats;