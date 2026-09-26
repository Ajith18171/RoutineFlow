import { CalendarDays, Sparkles } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";

function WelcomeBanner() {
  const { darkMode } = useTheme();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="max-w-7xl mx-auto px-6 pt-8">

      <div
        className={`rounded-3xl p-8 transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        }`}
      >

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

          <div>

            <div className="flex items-center gap-2 mb-3">

              <Sparkles size={20} />

              <span className="font-semibold">
                Welcome Back
              </span>

            </div>

            <h1 className="text-4xl font-bold mb-3">
              Good Morning 👋
            </h1>

            <p className={darkMode ? "text-gray-300" : "text-blue-100"}>
              Stay consistent today. Small progress every day leads to big achievements.
            </p>

          </div>

          <div
            className={`rounded-2xl px-6 py-5 ${
              darkMode
                ? "bg-slate-800"
                : "bg-white/20 backdrop-blur"
            }`}
          >

            <div className="flex items-center gap-3">

              <CalendarDays size={24} />

              <div>

                <p className="font-semibold">
                  Today's Date
                </p>

                <p className="text-sm opacity-90">
                  {today}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WelcomeBanner;