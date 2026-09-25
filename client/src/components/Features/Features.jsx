import {
  CalendarDays,
  ChartNoAxesCombined,
  BellRing,
  ShieldCheck,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

function Features() {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: CalendarDays,
      title: "Smart Scheduling",
      desc: "Create daily routines with an intuitive planner."
    },
    {
      icon: ChartNoAxesCombined,
      title: "Track Progress",
      desc: "Monitor completed and pending tasks effortlessly."
    },
    {
      icon: BellRing,
      title: "Reminders",
      desc: "Never miss an important routine or daily goal."
    },
    {
      icon: ShieldCheck,
      title: "Secure Account",
      desc: "Your personal schedules are protected securely."
    }
  ];

  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            Everything You Need
          </h2>

          <p
            className={`mt-4 text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Powerful tools to organize your daily life.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className={`rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                  darkMode
                    ? "bg-slate-900 border border-slate-800"
                    : "bg-white shadow-lg"
                }`}
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6">

                  <Icon size={30} />

                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p
                  className={`leading-7 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {item.desc}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Features;