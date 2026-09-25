import {
  UserPlus,
  CalendarPlus,
  CheckCircle2,
  BarChart3
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

function Workflow() {

  const { darkMode } = useTheme();

  const steps = [
    {
      icon: UserPlus,
      title: "Create Account",
      desc: "Register securely in just a few seconds."
    },
    {
      icon: CalendarPlus,
      title: "Add Schedule",
      desc: "Create your daily routines and tasks."
    },
    {
      icon: CheckCircle2,
      title: "Complete Tasks",
      desc: "Track your completed and pending work."
    },
    {
      icon: BarChart3,
      title: "View Reports",
      desc: "Analyze your weekly and monthly productivity."
    }
  ];

  return (

    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            How RoutineFlow Works
          </h2>

          <p
            className={`mt-4 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Get started in four simple steps.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {steps.map((step,index)=>{

            const Icon=step.icon;

            return(

              <div
              key={index}
              className={`rounded-3xl p-8 text-center transition duration-300 hover:-translate-y-2 ${
                darkMode
                ? "bg-slate-900 border border-slate-800"
                : "bg-white shadow-lg"
              }`}
              >

                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-6">

                  <Icon size={28}/>

                </div>

                <h3 className="text-xl font-bold mb-3">

                  {step.title}

                </h3>

                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>

                  {step.desc}

                </p>

              </div>

            )

          })}

        </div>

      </div>

    </section>

  );

}

export default Workflow;