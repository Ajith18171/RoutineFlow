function TimerControls({
  isRunning,
  startTimer,
  pauseTimer,
  resetTimer,
}) {
  return (
    <div className="flex justify-center gap-4 mt-8">

      {!isRunning ? (
        <button
          onClick={startTimer}
          className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
        >
          ▶ Start
        </button>
      ) : (
        <button
          onClick={pauseTimer}
          className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          ⏸ Pause
        </button>
      )}

      <button
        onClick={resetTimer}
        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
      >
        Reset
      </button>

    </div>
  );
}

export default TimerControls;