import ProgressRing from "./ProgressRing";


function DailyGoal({

  completed = 0,
  total = 10

}) {


  const progress = total > 0
    ? Math.round((completed / total) * 100)
    : 0;



  return (

    <div

      className="
        rounded-3xl
        p-6
        shadow-lg

        bg-white
        dark:bg-slate-900

        text-gray-900
        dark:text-white
      "

    >



      <h2

        className="
          text-xl
          font-bold
          mb-6
        "

      >

        Today's Goal

      </h2>




      <div

        className="
          flex
          justify-center
        "

      >

        <ProgressRing

          progress={progress}

        />

      </div>




      <p

        className="
          text-center
          mt-5

          text-gray-500
          dark:text-gray-400
        "

      >

        {completed} / {total} Tasks Completed

      </p>




    </div>

  );

}



export default DailyGoal;