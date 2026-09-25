import { useState } from "react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import useToast from "../../hooks/useToast";

function ChallengeStartForm({ onStarted }) {

  const { darkMode } = useTheme();
  const { showToast } = useToast();

  // Local date, not toISOString() — that converts through UTC and can
  // show yesterday's or tomorrow's date depending on your timezone.
  const getLocalToday = () => {

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

  };

  const [startDate, setStartDate] = useState(getLocalToday());
  const [submitting, setSubmitting] = useState(false);

  const handleStart = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);

      const response = await api.post(
        "/challenge/start",
        { start_date: startDate },
        { timeout: 8000 }
      );

      if (response.data.success) {

        showToast("90 Day Challenge started! Day 1 begins.");

        if (onStarted) {
          onStarted();
        }

      }

    } catch (error) {

      console.log(error.response?.data || error);

      showToast("Failed to start challenge");

    } finally {

      setSubmitting(false);

    }

  };

  return (
    <div
      className={`rounded-3xl p-8 text-center ${
        darkMode
          ? "bg-slate-900 border border-slate-800"
          : "bg-white shadow-xl"
      }`}
    >
      <p
        className={`text-sm font-semibold tracking-widest uppercase ${
          darkMode ? "text-blue-400" : "text-blue-600"
        }`}
      >
        Discipline • Learning • Fitness • Career
      </p>

      <h2
        className={`text-3xl font-bold mt-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        90 Days Level Up Challenge
      </h2>

      <p
        className={`mt-3 max-w-md mx-auto ${
          darkMode ? "text-slate-400" : "text-gray-500"
        }`}
      >
        Pick your Day 1 and lock in. Once a day is checked off, it can't be
        unchecked or edited.
      </p>

      <form
        onSubmit={handleStart}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={`rounded-xl border p-3 ${
            darkMode
              ? "bg-slate-950 border-slate-700 text-white [color-scheme:dark]"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
        >
          {submitting ? "Starting..." : "Start My 90 Days"}
        </button>
      </form>
    </div>
  );

}

export default ChallengeStartForm;