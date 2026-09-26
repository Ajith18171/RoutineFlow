import { useEffect, useState } from "react";

import {
  Check,
  Lock,
  Flame,
  RefreshCcw,
  Trash2,
  CheckCircle2,
  Circle,
} from "lucide-react";

import api from "../../services/api";

import { useTheme } from "../../Context/ThemeContext";

import useToast from "../../Hooks/useToast";

import ChallengeStartForm from "./ChallengeStartForm";
import DayDetailModal from "./DayDetailModal";

import ConfirmModal from "../Common/ConfirmModal";

import { getTaskIcon } from "../../config/taskIcons";


function ChallengeTracker({
  onStatsChanged,
}) {

  const { darkMode } = useTheme();

  const { showToast } = useToast();


  // ==========================
  // STATES
  // ==========================

  const [loading, setLoading] = useState(true);

  const [loadError, setLoadError] = useState("");

  const [challenge, setChallenge] = useState(null);

  const [completingId, setCompletingId] =
    useState(null);

  const [confirmTask, setConfirmTask] =
    useState(null);

  const [selectedDay, setSelectedDay] =
    useState(null);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);


  // ==========================
  // FETCH CHALLENGE
  // ==========================

  const fetchChallenge = async () => {

    try {

      setLoading(true);

      setLoadError("");


      const response = await api.get(
        "/challenge",
        {
          timeout: 8000,
        }
      );


      setChallenge(
        response.data.challenge
      );

    } catch (error) {

      console.log(
        "Challenge fetch error:",
        error
      );


      if (error.code === "ECONNABORTED") {

        setLoadError(
          "The server didn't respond in time. Is your backend running, and did it restart after you added the challenge routes?"
        );

      } else if (
        error.response?.status === 404
      ) {

        setLoadError(
          'GET /api/challenge returned 404 — the route isn\'t registered. Check server.js has app.use("/api/challenge", challengeRoutes) and that the backend was restarted.'
        );

      } else if (
        error.response?.status === 401
      ) {

        setLoadError(
          "You're not logged in (401). Try logging in again."
        );

      } else if (
        error.response?.status === 500
      ) {

        setLoadError(
          "Server error (500) — check your backend terminal for the exact SQL error. Make sure both migration files have been run."
        );

      } else {

        setLoadError(
          error.message ||
          "Couldn't reach the server. Check your backend is running."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // ==========================
  // INITIAL LOAD
  // ==========================

  useEffect(() => {

    fetchChallenge();

  }, []);


  // ==========================
  // CHALLENGE STARTED
  // ==========================

  const handleChallengeStarted = async () => {

    /*
      First refresh the challenge UI.
    */

    await fetchChallenge();


    /*
      Then refresh DashboardCards immediately.

      This is the important part that was missing.
    */

    if (onStatsChanged) {

      await onStatsChanged();

    }

  };


  // ==========================
  // COMPLETE CHALLENGE TASK
  // ==========================

  const handleCompleteTask = async (
    taskId
  ) => {

    try {

      setCompletingId(taskId);


      const response = await api.patch(
        `/schedules/${taskId}/complete`,
        {},
        {
          timeout: 8000,
        }
      );


      if (response.data.success) {

        /*
          Refresh challenge progress.
        */

        await fetchChallenge();


        /*
          Refresh dashboard numbers immediately.
        */

        if (onStatsChanged) {

          await onStatsChanged();

        }

      }

    } catch (error) {

      showToast(
        error.response?.data?.message ||
        "Failed to complete task"
      );

    } finally {

      setCompletingId(null);

      setConfirmTask(null);

    }

  };


  // ==========================
  // DELETE CHALLENGE
  // ==========================

  const handleDeleteChallenge = async () => {

    try {

      setDeleting(true);


      await api.delete(
        "/challenge",
        {
          timeout: 8000,
        }
      );


      showToast(
        "Challenge deleted"
      );


      setDeleteModalOpen(false);


      /*
        Refresh challenge UI.
      */

      await fetchChallenge();


      /*
        IMPORTANT:
        Deleting the challenge deletes its generated
        schedules, so dashboard numbers must also
        refresh immediately.
      */

      if (onStatsChanged) {

        await onStatsChanged();

      }

    } catch (error) {

      showToast(
        error.response?.data?.message ||
        "Failed to delete challenge"
      );

    } finally {

      setDeleting(false);

    }

  };


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div
        className={`rounded-3xl p-8 text-center ${
          darkMode
            ? "bg-slate-900 border border-slate-800"
            : "bg-white shadow-xl"
        }`}
      >

        Loading your challenge...

      </div>

    );

  }


  // ==========================
  // ERROR
  // ==========================

  if (loadError) {

    return (

      <div
        className={`rounded-3xl p-8 text-center ${
          darkMode
            ? "bg-slate-900 border border-slate-800"
            : "bg-white shadow-xl"
        }`}
      >

        <p
          className={
            darkMode
              ? "text-red-400"
              : "text-red-600"
          }
        >
          {loadError}
        </p>


        <button
          onClick={fetchChallenge}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >

          <RefreshCcw size={16} />

          Retry

        </button>

      </div>

    );

  }


  // ==========================
  // NO CHALLENGE
  // ==========================

  if (!challenge) {

    return (

      <ChallengeStartForm
        onStarted={handleChallengeStarted}
      />

    );

  }


  // ==========================
  // CHALLENGE DATA
  // ==========================

  const completedSet =
    new Set(
      challenge.completedDays
    );

  const todayDayNumber =
    challenge.todayDayNumber;

  const daysDone =
    challenge.completedDays.length;

  const todayTasks =
    challenge.todayTasks || [];


  // ==========================
  // RETURN
  // ==========================

  return (

    <div
      className={`rounded-3xl p-6 md:p-8 ${
        darkMode
          ? "bg-slate-900 border border-slate-800"
          : "bg-white shadow-xl"
      }`}
    >

      {/* ==========================
          HEADER
      ========================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <p
            className={`text-xs font-semibold tracking-widest uppercase ${
              darkMode
                ? "text-blue-400"
                : "text-blue-600"
            }`}
          >
            Discipline • Learning • Fitness • Career
          </p>


          <h2
            className={`text-2xl font-bold mt-1 flex items-center gap-2 ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >

            <Flame
              size={24}
              className="text-orange-500"
            />

            90 Days Level Up Challenge

          </h2>

        </div>


        <div className="flex items-center gap-4">

          <div className="text-right">

            <p
              className={
                darkMode
                  ? "text-slate-400 text-sm"
                  : "text-gray-500 text-sm"
              }
            >
              Progress
            </p>


            <p
              className={`text-2xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {daysDone} / 90
            </p>

          </div>


          <button
            onClick={() =>
              setDeleteModalOpen(true)
            }
            title="Delete this challenge"
            className={`p-2 rounded-xl transition ${
              darkMode
                ? "hover:bg-red-900/40 text-red-400"
                : "hover:bg-red-50 text-red-600"
            }`}
          >

            <Trash2 size={20} />

          </button>

        </div>

      </div>


      {/* ==========================
          TODAY'S CHECKLIST
      ========================== */}

      {todayDayNumber ? (

        <div
          className={`mb-6 rounded-2xl p-4 ${
            darkMode
              ? "bg-slate-950 border border-slate-800"
              : "bg-gray-50"
          }`}
        >

          <p
            className={`font-bold mb-3 ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Day {todayDayNumber} — Today's Tasks
          </p>


          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

            {todayTasks.map((task) => {

              const isDone =
                task.status === "Completed";


              return (

                <button
                  key={task.id}
                  onClick={() =>
                    !isDone &&
                    setConfirmTask(task)
                  }
                  disabled={
                    isDone ||
                    completingId === task.id
                  }
                  className={`flex flex-col items-start gap-1 text-left px-3 py-3 rounded-xl border transition ${
                    isDone
                      ? darkMode
                        ? "opacity-50 cursor-default border-slate-800 bg-slate-900"
                        : "opacity-60 cursor-default border-gray-200 bg-gray-100"
                      : darkMode
                      ? "border-slate-800 hover:border-blue-600 hover:bg-slate-800"
                      : "border-gray-200 hover:border-blue-400 hover:bg-white"
                  }`}
                >

                  <div className="flex items-center gap-2 w-full">

                    <span className="text-lg leading-none">
                      {getTaskIcon(
                        task.task_id
                      )}
                    </span>


                    {isDone ? (

                      <CheckCircle2
                        size={16}
                        className="text-green-500 shrink-0 ml-auto"
                      />

                    ) : (

                      <Circle
                        size={16}
                        className={`shrink-0 ml-auto ${
                          darkMode
                            ? "text-slate-600"
                            : "text-gray-400"
                        }`}
                      />

                    )}

                  </div>


                  <span
                    className={`text-xs font-semibold ${
                      isDone
                        ? "line-through"
                        : ""
                    } ${
                      darkMode
                        ? "text-slate-200"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </span>


                  <span
                    className={`text-[11px] ${
                      darkMode
                        ? "text-slate-500"
                        : "text-gray-400"
                    }`}
                  >
                    {task.time?.slice(0, 5)}
                  </span>

                </button>

              );

            })}

          </div>


          {todayTasks.length > 0 &&
            todayTasks.every(
              (task) =>
                task.status ===
                "Completed"
            ) && (

              <div className="mt-4 py-2 rounded-xl bg-green-100 text-green-700 text-center font-semibold text-sm">

                Day {todayDayNumber} complete — see you tomorrow 💪

              </div>

            )}

        </div>

      ) : (

        <div
          className={`w-full mb-6 py-3 rounded-xl text-center font-semibold ${
            darkMode
              ? "bg-slate-800 text-slate-300"
              : "bg-gray-100 text-gray-600"
          }`}
        >

          {daysDone >= 90
            ? "Challenge complete — 90/90! 🎉"
            : "This challenge window has ended."}

        </div>

      )}


      {/* ==========================
          90 DAY CIRCLES
      ========================== */}

      <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 md:gap-3">

        {Array.from(
          { length: 90 },
          (_, index) => {

            const dayNumber =
              index + 1;

            const isDone =
              completedSet.has(
                dayNumber
              );

            const isToday =
              dayNumber ===
              todayDayNumber;

            const isMissed =
              !isDone &&
              !isToday &&
              todayDayNumber &&
              dayNumber <
                todayDayNumber;

            const isFuture =
              !isDone &&
              (
                !todayDayNumber ||
                dayNumber >
                  todayDayNumber
              );


            return (

              <button
                key={dayNumber}
                onClick={() =>
                  setSelectedDay(
                    dayNumber
                  )
                }
                title={`Day ${dayNumber}`}
                className={`
                  aspect-square rounded-full flex items-center justify-center
                  text-[11px] md:text-xs font-semibold select-none transition
                  hover:scale-105
                  ${
                    isDone
                      ? "bg-green-600 text-white"
                      : isToday
                      ? "bg-blue-600 text-white ring-4 ring-blue-300 animate-pulse"
                      : isMissed
                      ? darkMode
                        ? "bg-slate-800 text-slate-600"
                        : "bg-gray-200 text-gray-400"
                      : darkMode
                      ? "bg-slate-950 text-slate-600 border border-slate-800"
                      : "bg-gray-50 text-gray-400 border border-gray-200"
                  }
                `}
              >

                {isDone ? (

                  <Check size={14} />

                ) : isFuture ? (

                  <Lock size={11} />

                ) : (

                  dayNumber

                )}

              </button>

            );

          }
        )}

      </div>


      {/* ==========================
          MOTIVATION FOOTER
      ========================== */}

      <div
        className={`mt-8 rounded-2xl p-6 text-center ${
          darkMode
            ? "bg-slate-950 border border-slate-800"
            : "bg-slate-900"
        }`}
      >

        <p className="text-white font-bold text-lg tracking-wide">
          90 DAYS. NO EXCUSES. SHOW UP EVERY DAY.
        </p>

        <p className="text-blue-400 font-semibold mt-1 tracking-widest text-sm">
          LEARN • BUILD • IMPROVE • REPEAT
        </p>

      </div>


      {/* ==========================
          DAY DETAIL MODAL
      ========================== */}

      {selectedDay && (

        <DayDetailModal
          dayNumber={selectedDay}
          isToday={
            selectedDay ===
            todayDayNumber
          }
          onClose={() =>
            setSelectedDay(null)
          }
          onTaskCompleted={
            async () => {

              await fetchChallenge();

              if (onStatsChanged) {
                await onStatsChanged();
              }

            }
          }
        />

      )}


      {/* ==========================
          COMPLETE TASK MODAL
      ========================== */}

      <ConfirmModal
        isOpen={!!confirmTask}

        title="Mark task complete?"

        message={
          confirmTask
            ? `Is "${confirmTask.title}" completed? This can't be undone once confirmed.`
            : ""
        }

        onCancel={() =>
          setConfirmTask(null)
        }

        onConfirm={() =>
          handleCompleteTask(
            confirmTask.id
          )
        }

        confirmText="Complete"

        confirmColor="green"
      />


      {/* ==========================
          DELETE CHALLENGE MODAL
      ========================== */}

      <ConfirmModal
        isOpen={deleteModalOpen}

        title="Delete 90 Day Challenge"

        message="This permanently deletes your challenge and every task generated for all 90 days, including anything already completed. This can't be undone."

        onCancel={() =>
          !deleting &&
          setDeleteModalOpen(false)
        }

        onConfirm={
          handleDeleteChallenge
        }

        confirmText="Delete"

        confirmColor="red"

        loading={deleting}
      />

    </div>

  );

}


export default ChallengeTracker;
