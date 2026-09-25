import {
  Plus,
  ClipboardList,
  BarChart3,
  User
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function QuickActions() {

  const navigate = useNavigate();

  const { darkMode } = useTheme();

  const actions = [

    {
      title: "Add Schedule",
      icon: Plus,
      color: "bg-blue-600",
      path: "/schedule/add"
    },

    {
      title: "My Schedule",
      icon: ClipboardList,
      color: "bg-green-600",
      path: "/schedule"
    },

    {
      title: "Reports",
      icon: BarChart3,
      color: "bg-purple-600",
      path: "/reports"
    },

    {
      title: "Profile",
      icon: User,
      color: "bg-orange-500",
      path: "/profile"
    }

  ];

  return (

    <section className="max-w-7xl mx-auto px-6 pb-10">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {actions.map((item,index)=>{

          const Icon=item.icon;

          return(

            <button
              key={index}
              onClick={()=>navigate(item.path)}
              className={`rounded-3xl p-6 transition-all duration-300 hover:scale-105 ${
                darkMode
                ? "bg-slate-900 border border-slate-800"
                : "bg-white shadow-lg"
              }`}
            >

              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-5`}>

                <Icon size={30}/>

              </div>

              <h3 className="font-semibold">

                {item.title}

              </h3>

            </button>

          )

        })}

      </div>

    </section>

  );

}

export default QuickActions;