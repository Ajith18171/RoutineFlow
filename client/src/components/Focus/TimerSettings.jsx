import { useState } from "react";

function TimerSettings({

  settings,

  saveSettings

}) {

  const [focus,setFocus]=useState(settings.focus);

  const [shortBreak,setShortBreak]=useState(settings.shortBreak);

  const [longBreak,setLongBreak]=useState(settings.longBreak);

  const handleSave=()=>{

    saveSettings({

      focus:Number(focus),

      shortBreak:Number(shortBreak),

      longBreak:Number(longBreak)

    });

  };

  return(

    <div className="mt-10 rounded-2xl p-6 bg-slate-100 dark:bg-slate-800">

      <h2 className="text-xl font-bold mb-5">

        Timer Settings

      </h2>

      <div className="grid md:grid-cols-3 gap-5">

        <div>

          <label>Focus</label>

          <input
            type="number"
            value={focus}
            onChange={(e)=>setFocus(e.target.value)}
            className="w-full mt-2 rounded-lg border p-2"
          />

        </div>

        <div>

          <label>Short Break</label>

          <input
            type="number"
            value={shortBreak}
            onChange={(e)=>setShortBreak(e.target.value)}
            className="w-full mt-2 rounded-lg border p-2"
          />

        </div>

        <div>

          <label>Long Break</label>

          <input
            type="number"
            value={longBreak}
            onChange={(e)=>setLongBreak(e.target.value)}
            className="w-full mt-2 rounded-lg border p-2"
          />

        </div>

      </div>

      <button

        onClick={handleSave}

        className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-xl"

      >

        Save Settings

      </button>

    </div>

  );

}

export default TimerSettings;