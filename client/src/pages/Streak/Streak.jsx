import { useEffect, useState } from "react";
import api from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import StreakCard from "../../components/Streak/StreakCard";
import DailyGoal from "../../components/Streak/DailyGoal";
import AchievementCard from "../../components/Streak/AchievementCard";

import { useTheme } from "../../Context/ThemeContext";



function Streak() {


  const { darkMode } = useTheme();


  const [sidebarOpen, setSidebarOpen] = useState(false);



  const [loading, setLoading] = useState(true);



  const [streakData, setStreakData] = useState({

    currentStreak: 0,

    longestStreak: 0,

    completedToday: 0,

    dailyGoal: 10

  });





  useEffect(() => {

    fetchStreak();

  }, []);






  const fetchStreak = async () => {


    try {


      const response = await api.get("/streak");



      const streak =
        response.data.streak;



      setStreakData({

        currentStreak:
          streak?.current_streak || 0,


        longestStreak:
          streak?.longest_streak || 0,


        completedToday:
          streak?.completed_today || 0,


        dailyGoal: 10

      });



    } catch(error) {


      console.log(
        "Streak Error:",
        error.response?.data || error
      );


    } finally {


      setLoading(false);


    }


  };







  return (


    <div

      className={`

        min-h-screen

        transition-all


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

        openSidebar={() =>

          setSidebarOpen(true)

        }

      />







      <Sidebar

        isOpen={sidebarOpen}

        closeSidebar={() =>

          setSidebarOpen(false)

        }

      />







      <main className="p-6 lg:ml-64">






        <div className="mb-8">


          <h1 className="text-3xl font-bold">

            🔥 Streak System

          </h1>



          <p

            className="

              text-gray-500

              dark:text-gray-400

              mt-2

            "

          >

            Track your productivity consistency.

          </p>



        </div>








        {

          loading ?


          (

            <div className="text-center py-20">

              Loading streak...

            </div>


          )


          :


          (


            <div

              className="

                space-y-6

              "

            >





              <StreakCard


                currentStreak={

                  streakData.currentStreak

                }


                longestStreak={

                  streakData.longestStreak

                }


              />








              <DailyGoal


                completed={

                  streakData.completedToday

                }


                total={

                  streakData.dailyGoal

                }


              />








              <AchievementCard />






            </div>


          )


        }





      </main>






    </div>


  );

}




export default Streak;