import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

function CalendarToolbar({
  currentDate,
  onPrev,
  onNext,
  onToday,
  view,
  setView,
}) {
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

      {/* Left */}
      <div className="flex items-center gap-3">

        <button
          onClick={onPrev}
          className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={onNext}
          className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center"
        >
          <ChevronRight size={20} />
        </button>

        <h2 className="text-2xl font-bold">
          {monthYear}
        </h2>
      </div>

      {/* Center */}
      <button
        onClick={onToday}
        className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
      >
        <CalendarDays size={18} />
        Today
      </button>

      {/* Right */}
      <div className="flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700">

        <button
          onClick={() => setView("month")}
          className={`px-5 py-2 transition ${
            view === "month"
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Month
        </button>

        <button
          onClick={() => setView("week")}
          className={`px-5 py-2 transition ${
            view === "week"
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Week
        </button>

        <button
          onClick={() => setView("day")}
          className={`px-5 py-2 transition ${
            view === "day"
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Day
        </button>

      </div>

    </div>
  );
}

export default CalendarToolbar;