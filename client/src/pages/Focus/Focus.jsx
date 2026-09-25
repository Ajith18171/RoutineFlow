import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import PomodoroTimer from "../../components/Focus/PomodoroTimer";

import { useTheme } from "../../context/ThemeContext";


function Focus(){

  const { darkMode } = useTheme();

  const [sidebarOpen,setSidebarOpen] =
    useState(false);



  return (

    <div
      className={`
        min-h-screen

        ${
          darkMode
          ?
          "bg-slate-950 text-white"
          :
          "bg-slate-100 text-gray-900"
        }
      `}
    >


      <Navbar
        openSidebar={()=>
          setSidebarOpen(true)
        }
      />



      <Sidebar

        isOpen={sidebarOpen}

        closeSidebar={()=>
          setSidebarOpen(false)
        }

      />




      <main className="
        p-6
        lg:ml-64
      ">


        <div className="mb-8">


          <h1 className="text-4xl font-bold">

            Focus Mode 🎯

          </h1>



          <p className="
            mt-2
            text-gray-500
            dark:text-gray-400
          ">

            Improve concentration with Pomodoro technique.

          </p>


        </div>




        <PomodoroTimer />



      </main>



    </div>

  );

}


export default Focus;