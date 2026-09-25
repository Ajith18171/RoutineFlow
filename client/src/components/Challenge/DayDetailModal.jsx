import { useEffect, useState } from "react";
import { X, CheckCircle2, Circle, Save } from "lucide-react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import useToast from "../../hooks/useToast";
import { getTaskIcon } from "../../config/taskIcons";
import ConfirmModal from "../Common/ConfirmModal";

function DayDetailModal({ dayNumber, isToday, onClose, onTaskCompleted }) {

  const { darkMode } = useTheme();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState(null);
  const [lockedMessage, setLockedMessage] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [completingId, setCompletingId] = useState(null);
  const [confirmTask, setConfirmTask] = useState(null);

  const fetchDay = async () => {

    try {

      setLoading(true);
      setLockedMessage("");

      const response = await api.get(
        `/challenge/day/${dayNumber}`,
        { timeout: 8000 }
      );

      setDay(response.data.day);
      setNote(response.data.day?.note || "");

    } catch (error) {

      console.log(error.response?.data || error);

      if (error.response?.status === 403) {
        setLockedMessage(
          error.response.data?.message ||
            `Day ${dayNumber} isn't accessible yet.`
        );
      } else {
        showToast("Failed to load that day");
      }

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayNumber]);

  const handleCompleteTask = async (taskId) => {

    try {

      setCompletingId(taskId);

      await api.patch(
        `/schedules/${taskId}/complete`,
        {},
        { timeout: 8000 }
      );

      await fetchDay();

      if (onTaskCompleted) {
        onTaskCompleted();
      }

    } catch (error) {

      showToast(
        error.response?.data?.message || "Failed to complete task"
      );

    } finally {

      setCompletingId(null);
      setConfirmTask(null);

    }

  };

  const handleSaveNote = async () => {

    try {

      setSaving(true);

      await api.put(
        `/challenge/day/${dayNumber}/note`,
        { note },
        { timeout: 8000 }
      );

      showToast("Note saved");

    } catch (error) {

      showToast(
        error.response?.data?.message || "Failed to save note"
      );

    } finally {

      setSaving(false);

    }

  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-6 ${
          darkMode ? "bg-slate-900 border border-slate-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between mb-4">

          <h3 className="text-xl font-bold">
            Day {dayNumber}
            {day?.date && (
              <span
                className={`ml-2 text-sm font-normal ${
                  darkMode ? "text-slate-400" : "text-gray-500"
                }`}
              >
                {new Date(day.date).toDateString()}
              </span>
            )}
          </h3>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg ${
              darkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
            }`}
          >
            <X size={20} />
          </button>

        </div>

        {loading ? (

          <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
            Loading...
          </p>

        ) : lockedMessage ? (

          <div className="text-center py-6">
            <p className={darkMode ? "text-slate-300" : "text-gray-600"}>
              🔒 {lockedMessage}
            </p>
          </div>

        ) : (

          <>
            <div className="grid grid-cols-2 gap-2 mb-6">

              {day?.tasks?.map((task) => {

                const isDone = task.status === "Completed";
                const canToggle = isToday && !isDone;

                return (
                  <button
                    key={task.id}
                    onClick={() => canToggle && setConfirmTask(task)}
                    disabled={!canToggle || completingId === task.id}
                    className={`flex flex-col items-start gap-1 text-left px-3 py-2 rounded-xl border transition ${
                      canToggle
                        ? darkMode
                          ? "border-slate-800 hover:border-blue-600 hover:bg-slate-800"
                          : "border-gray-200 hover:border-blue-400 hover:bg-gray-100"
                        : darkMode
                        ? "border-slate-800 cursor-default"
                        : "border-gray-200 cursor-default"
                    } ${isDone ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-base leading-none">
                        {getTaskIcon(task.task_id)}
                      </span>

                      {isDone ? (
                        <CheckCircle2 size={15} className="text-green-500 shrink-0 ml-auto" />
                      ) : (
                        <Circle
                          size={15}
                          className={`shrink-0 ml-auto ${
                            darkMode ? "text-slate-600" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>

                    <span
                      className={`text-xs font-medium ${isDone ? "line-through" : ""}`}
                    >
                      {task.title}
                    </span>

                    <span
                      className={`text-[11px] ${
                        darkMode ? "text-slate-500" : "text-gray-400"
                      }`}
                    >
                      {task.time?.slice(0, 5)}
                    </span>
                  </button>
                );

              })}

              {!isToday && (
                <p
                  className={`text-xs mt-2 col-span-2 ${
                    darkMode ? "text-slate-500" : "text-gray-400"
                  }`}
                >
                  {day?.tasks?.some((t) => t.status !== "Completed")
                    ? "Only today's tasks can be checked off."
                    : ""}
                </p>
              )}

            </div>

            <div>

              <label
                className={`font-medium text-sm block mb-2 ${
                  darkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                What did you learn today?
              </label>

              <textarea
                rows="4"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a quick note about what you learned or worked on..."
                className={`w-full rounded-xl border p-3 text-sm ${
                  darkMode
                    ? "bg-slate-950 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              />

              <button
                onClick={handleSaveNote}
                disabled={saving}
                className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Note"}
              </button>

            </div>
          </>

        )}

      </div>

      <ConfirmModal
        isOpen={!!confirmTask}
        title="Mark task complete?"
        message={
          confirmTask
            ? `Is "${confirmTask.title}" completed? This can't be undone once confirmed.`
            : ""
        }
        onCancel={() => setConfirmTask(null)}
        onConfirm={() => handleCompleteTask(confirmTask.id)}
      />
    </div>
  );

}

export default DayDetailModal;