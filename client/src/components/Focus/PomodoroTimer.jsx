import { useEffect, useState } from "react";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import TimerSettings from "./TimerSettings";


function PomodoroTimer() {


  const defaultSettings = {

    focus: 25,

    shortBreak: 5,

    longBreak: 15,

  };



  const [settings, setSettings] = useState(() => {


    const saved =
      localStorage.getItem(
        "pomodoroSettings"
      );


    return saved
      ? JSON.parse(saved)
      : defaultSettings;


  });



  const [mode,setMode] = useState(
    "Focus"
  );



  const [sessions,setSessions] =
    useState(() => {


      const saved =
        localStorage.getItem(
          "pomodoroSessions"
        );


      return saved
        ? Number(saved)
        : 0;


    });



  const getTime = () => {


    if(mode === "Focus")
      return settings.focus * 60;



    if(
      mode === "Break" &&
      sessions > 0 &&
      sessions % 4 === 0
    )

      return settings.longBreak * 60;



    return settings.shortBreak * 60;


  };



  const [timeLeft,setTimeLeft] =
    useState(
      settings.focus * 60
    );



  const [isRunning,setIsRunning] =
    useState(false);




  useEffect(()=>{


    if(
      "Notification" in window &&
      Notification.permission !== "granted"
    ){

      Notification.requestPermission();

    }


  },[]);




  useEffect(()=>{


    let timer;



    if(
      isRunning &&
      timeLeft > 0
    ){


      timer=setInterval(()=>{


        setTimeLeft(
          prev=>prev-1
        );


      },1000);


    }



    if(
      timeLeft === 0
    ){


      completeSession();


    }



    return ()=>clearInterval(timer);



  },[
    isRunning,
    timeLeft
  ]);





  const completeSession = ()=>{


    new Audio(
      "/sounds/bell.mp3"
    ).play()
    .catch(()=>{});



    if(
      Notification.permission === "granted"
    ){


      new Notification(
        "🔔 RoutineFlow",
        {

          body:
          `${mode} session completed!`

        }

      );


    }



    if(mode==="Focus"){


      const newSessions =
        sessions + 1;


      setSessions(
        newSessions
      );


      localStorage.setItem(

        "pomodoroSessions",

        newSessions

      );



      setMode(
        "Break"
      );



      setTimeLeft(
        settings.shortBreak * 60
      );


    }

    else{


      setMode(
        "Focus"
      );


      setTimeLeft(
        settings.focus * 60
      );


    }



    setIsRunning(false);


  };





  const startTimer=()=>{


    setIsRunning(true);


  };



  const pauseTimer=()=>{


    setIsRunning(false);


  };



  const resetTimer=()=>{


    setIsRunning(false);


    setMode(
      "Focus"
    );


    setTimeLeft(
      settings.focus * 60
    );


  };





  const saveSettings=(newSettings)=>{


    setSettings(
      newSettings
    );


    localStorage.setItem(

      "pomodoroSettings",

      JSON.stringify(
        newSettings
      )

    );



    setTimeLeft(
      newSettings.focus * 60
    );


    setMode(
      "Focus"
    );


  };





  const minutes =
    String(
      Math.floor(
        timeLeft / 60
      )
    ).padStart(2,"0");



  const seconds =
    String(
      timeLeft % 60
    ).padStart(2,"0");




  const totalTime =
    mode==="Focus"

    ?

    settings.focus * 60

    :

    (
      sessions % 4 === 0 &&
      sessions !== 0
    )

    ?

    settings.longBreak * 60

    :

    settings.shortBreak * 60;




  const progress =

    (
      (totalTime-timeLeft)
      /
      totalTime

    ) * 100;





  return (

    <div className="max-w-xl mx-auto">


      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">


        <h1 className="text-3xl font-bold text-center">

          🍅 Pomodoro Focus

        </h1>



        <p className="text-center text-gray-500 mt-2">

          {mode} Session

        </p>




        <div className="w-72 h-72 mx-auto mt-8">


          <CircularProgressbar


            value={progress}


            text={`${minutes}:${seconds}`}



            styles={
              buildStyles({

                pathColor:
                  mode==="Focus"
                  ?
                  "#2563eb"
                  :
                  "#10b981",


                textColor:
                  "#2563eb",


                trailColor:
                  "#e5e7eb",


                textSize:
                  "16px"

              })
            }


          />


        </div>





        <div className="flex justify-center gap-4 mt-8">


          {
            isRunning ?

            (

              <button

                onClick={pauseTimer}

                className="px-6 py-3 bg-yellow-500 text-white rounded-xl"

              >

                Pause

              </button>

            )

            :

            (

              <button

                onClick={startTimer}

                className="px-6 py-3 bg-green-600 text-white rounded-xl"

              >

                Start

              </button>


            )

          }




          <button

            onClick={resetTimer}

            className="px-6 py-3 bg-red-600 text-white rounded-xl"

          >

            Reset

          </button>



        </div>





        <div className="mt-8 text-center">


          <p className="text-lg">

            Completed Sessions

          </p>



          <p className="text-5xl font-bold text-blue-600">

            {sessions}

          </p>



        </div>





        <TimerSettings


          settings={settings}


          saveSettings={saveSettings}


        />



      </div>



    </div>


  );

}


export default PomodoroTimer;