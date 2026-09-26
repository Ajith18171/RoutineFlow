import { CalendarDays, Clock } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";


function CalendarSidebar({
  selectedDate,
  schedules
}) {


  const { darkMode } = useTheme();



  const filteredSchedules = schedules.filter(
    (schedule)=>{

      if(!selectedDate || !schedule.date)
        return false;


      return (
        new Date(schedule.date)
        .toDateString()
        ===
        selectedDate.toDateString()
      );

    }
  );




  return (

    <aside

      className={`
        rounded-2xl
        p-5
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



      <div
        className="
          flex
          items-center
          gap-2
          mb-5
        "
      >

        <CalendarDays size={22}/>


        <h2 className="text-xl font-bold">

          Day Schedule

        </h2>


      </div>





      {
        selectedDate && (

          <p
            className="
              mb-4
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >

            {
              selectedDate.toDateString()
            }

          </p>

        )
      }





      {
        filteredSchedules.length === 0 ?

        (

          <div
            className="
              text-center
              py-10
              text-gray-500
            "
          >

            No schedules


          </div>

        )

        :

        (

          <div
            className="
              space-y-3
            "
          >

            {
              filteredSchedules.map(
                (schedule)=>(


                  <div

                    key={schedule.id}

                    className="
                      p-3
                      rounded-xl
                      border
                      border-slate-200
                      dark:border-slate-700
                    "

                  >


                    <h3
                      className="
                        font-semibold
                      "
                    >

                      {schedule.task}

                    </h3>




                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        mt-2
                        text-gray-500
                      "
                    >

                      <Clock size={15}/>

                      {schedule.time}


                    </div>



                  </div>


                )
              )
            }


          </div>

        )
      }





    </aside>

  );

}


export default CalendarSidebar;