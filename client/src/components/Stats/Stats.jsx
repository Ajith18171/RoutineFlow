import { CheckCircle2, Clock3, Users, ShieldCheck } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";

function Stats() {
  const { darkMode } = useTheme();

  const stats = [
    {
      icon: CheckCircle2,
      number: "10K+",
      title: "Tasks Completed",
    },
    {
      icon: Clock3,
      number: "24/7",
      title: "Available Anytime",
    },
    {
      icon: Users,
      number: "500+",
      title: "Happy Users",
    },
    {
      icon: ShieldCheck,
      number: "100%",
      title: "Secure Data",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`rounded-3xl p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  darkMode
                    ? "bg-slate-900 border border-slate-800"
                    : "bg-white shadow-lg"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                  <Icon size={30} />
                </div>

                <h2 className="text-3xl font-bold text-blue-600">
                  {item.number}
                </h2>

                <p
                  className={`mt-2 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Stats;