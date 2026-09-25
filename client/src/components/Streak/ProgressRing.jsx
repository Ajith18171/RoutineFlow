function ProgressRing({
  progress = 0
}) {


  const radius = 45;

  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (progress / 100) * circumference;



  return (

    <div
      className="
        relative
        w-36
        h-36
      "
    >


      <svg
        className="
          w-full
          h-full
          -rotate-90
        "
        viewBox="0 0 120 120"
      >


        {/* Background */}

        <circle

          cx="60"

          cy="60"

          r={radius}

          fill="none"

          stroke="currentColor"

          strokeWidth="10"

          className="
            text-gray-200
            dark:text-slate-700
          "

        />



        {/* Progress */}

        <circle

          cx="60"

          cy="60"

          r={radius}

          fill="none"

          stroke="currentColor"

          strokeWidth="10"

          strokeLinecap="round"

          strokeDasharray={circumference}

          strokeDashoffset={offset}

          className="
            text-blue-600
          "

        />


      </svg>





      <div

        className="
          absolute
          inset-0

          flex
          items-center
          justify-center

          text-2xl
          font-bold
        "

      >

        {progress}%

      </div>



    </div>

  );

}



export default ProgressRing;