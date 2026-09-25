import DayCell from "./DayCell";


function CalendarView({
  currentDate,
  schedules,
  onSelectDay
}) {


  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();



  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();



  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();



  const days = [];



  // Empty cells before month starts

  for(let i = 0; i < firstDay; i++){

    days.push(null);

  }



  // Month dates

  for(let i = 1; i <= daysInMonth; i++){

    days.push(
      new Date(
        year,
        month,
        i
      )
    );

  }



  return (

    <div
      className="
        rounded-2xl
        overflow-hidden
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
      "
    >


      {/* Week Header */}

      <div
        className="
          grid
          grid-cols-7
          bg-gray-100
          dark:bg-slate-800
          text-gray-700
          dark:text-gray-200
          font-semibold
          text-center
        "
      >

        {
          [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
          ].map(day=>(

            <div
              key={day}
              className="p-3"
            >
              {day}
            </div>

          ))
        }

      </div>




      {/* Calendar Body */}

      <div
className="
  grid
  grid-cols-7
  bg-white
  dark:bg-slate-900
  overflow-hidden
"
>

        {
          days.map(
            (day,index)=>(

              <DayCell

                key={index}

                date={day}

                schedules={schedules}

                onSelectDay={onSelectDay}

              />

            )
          )
        }

      </div>



    </div>

  );

}


export default CalendarView;