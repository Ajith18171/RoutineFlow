import { Flame, Trophy } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";


function StreakCard({
  currentStreak = 0,
  longestStreak = 0
}) {


  const { darkMode } = useTheme();


  return (

    <div
      className={`
        rounded-3xl
        p-6
        shadow-lg

        ${
          darkMode
          ?
          "bg-slate-900 text-white"
          :
          "bg-white text-gray-900"
        }
      `}
    >


      <div className="grid md:grid-cols-2 gap-6">


        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <div
            className="
              p-4
              rounded-2xl
              bg-orange-100
              text-orange-600
            "
          >

            <Flame size={32}/>

          </div>


          <div>

            <p className="text-gray-500">
              Current Streak
            </p>

            <h2 className="text-4xl font-bold">

              {currentStreak}

              <span className="text-lg ml-2">
                Days
              </span>

            </h2>

          </div>


        </div>





        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <div
            className="
              p-4
              rounded-2xl
              bg-yellow-100
              text-yellow-600
            "
          >

            <Trophy size={32}/>

          </div>


          <div>

            <p className="text-gray-500">
              Longest Streak
            </p>


            <h2 className="text-4xl font-bold">

              {longestStreak}

              <span className="text-lg ml-2">
                Days
              </span>

            </h2>


          </div>


        </div>


      </div>


    </div>

  );

}


export default StreakCard;