import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Tag,
  Repeat,
  Bell,
} from "lucide-react";


function ScheduleDetails() {

  const { darkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(null);


  useEffect(() => {

    fetchSchedule();

  }, []);



  const fetchSchedule = async () => {

    try {

      const response = await api.get(
        `/schedules/${id}`
      );

      setSchedule(
        response.data.schedule
      );


    } catch(error) {

      console.log(
        error.response?.data || error
      );

    }

  };



  if(!schedule){

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }




  return (

<div

className={`min-h-screen px-6 py-10 ${
darkMode
?
"bg-slate-950 text-white"
:
"bg-slate-100 text-gray-900"
}`}

>


<div className="max-w-4xl mx-auto">


<button

onClick={() => navigate(-1)}

className="
flex items-center gap-2
text-blue-500
mb-6
hover:text-blue-600
"

>

<ArrowLeft size={18}/>

Back

</button>





<div

className={`rounded-3xl p-8 ${
darkMode
?
"bg-slate-900 border border-slate-800"
:
"bg-white shadow-lg"
}`}

>


<div className="flex justify-between items-start">


<div>

<h1 className="text-3xl font-bold">

{schedule.title}

</h1>


<p className="mt-3 opacity-70">

{schedule.task}

</p>

</div>



<span

className={`px-4 py-2 rounded-full text-sm font-semibold ${
schedule.status === "Completed"
?
"bg-green-100 text-green-700"
:
"bg-orange-100 text-orange-700"
}`}

>

{schedule.status}

</span>


</div>







<div className="grid md:grid-cols-2 gap-5 mt-8">


<div className="flex items-center gap-3">

<CalendarDays size={20}/>

<div>

<p className="text-sm opacity-60">
Date
</p>

<p>
{schedule.date?.split("T")[0]}
</p>

</div>

</div>





<div className="flex items-center gap-3">

<Clock size={20}/>

<div>

<p className="text-sm opacity-60">
Time
</p>

<p>
{schedule.time}
</p>

</div>

</div>







<div className="flex items-center gap-3">

<Tag size={20}/>

<div>

<p className="text-sm opacity-60">
Priority
</p>

<p>
{schedule.priority}
</p>

</div>

</div>







<div className="flex items-center gap-3">

<Repeat size={20}/>

<div>

<p className="text-sm opacity-60">
Repeat
</p>

<p>
{schedule.repeat_task ? "Yes" : "No"}
</p>

</div>

</div>






<div className="flex items-center gap-3">

<Bell size={20}/>

<div>

<p className="text-sm opacity-60">
Reminder
</p>

<p>
{schedule.reminder ? "Enabled" : "Disabled"}
</p>

</div>

</div>



</div>






<div className="mt-8">


<h2 className="text-xl font-bold mb-3">

Description

</h2>


<p className="opacity-80">

{schedule.description || "No description"}

</p>


</div>





<button

onClick={() =>
navigate(`/schedule/edit/${schedule.id}`)
}

className="
mt-8
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-3
rounded-xl
transition
"

>

Edit Schedule

</button>





</div>


</div>


</div>

  );

}


export default ScheduleDetails;