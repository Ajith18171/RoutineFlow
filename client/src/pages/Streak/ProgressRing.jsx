function ProgressRing({
  progress = 0
}) {


  return (

    <div className="relative w-32 h-32">


      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
      >

        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-gray-200"
        />


        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="251"
          strokeDashoffset={
            251 - (251 * progress) / 100
          }
          className="text-blue-600"
        />


      </svg>



      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          font-bold
          text-xl
        "
      >

        {progress}%

      </div>


    </div>

  );

}


export default ProgressRing;