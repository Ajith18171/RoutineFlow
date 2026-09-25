import { Clock } from "lucide-react";


function EventCard({
  schedule
}) {



  const priorityColor = () => {


    switch(schedule.priority) {


      case "High":

        return `
          bg-red-100
          text-red-700
          border-red-300

          dark:bg-red-900/30
          dark:text-red-300
          dark:border-red-700
        `;



      case "Medium":

        return `
          bg-yellow-100
          text-yellow-700
          border-yellow-300

          dark:bg-yellow-900/30
          dark:text-yellow-300
          dark:border-yellow-700
        `;



      case "Low":

        return `
          bg-green-100
          text-green-700
          border-green-300

          dark:bg-green-900/30
          dark:text-green-300
          dark:border-green-700
        `;



      default:

        return `
          bg-blue-100
          text-blue-700
          border-blue-300

          dark:bg-blue-900/30
          dark:text-blue-300
          dark:border-blue-700
        `;

    }


  };





  return (

    <div

      className={`
        border
        rounded-lg
        px-1
        py-0.5
        text-[11px]

        transition
        hover:scale-[1.02]

        ${priorityColor()}
      `}

    >



      <p
        className="
          font-semibold
          truncate
        "
      >

        {schedule.task}

      </p>





      {
        schedule.time && (

          <div

            className="
              flex
              items-center
              gap-1
              mt-1
              opacity-80
            "

          >

            <Clock size={12}/>


            <span>

              {schedule.time}

            </span>


          </div>

        )
      }





    </div>

  );

}


export default EventCard;