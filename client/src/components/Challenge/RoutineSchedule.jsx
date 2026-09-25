import { useEffect, useState } from "react";
import { Clock, Pencil, Check, X } from "lucide-react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import useToast from "../../hooks/useToast";
import { getTaskIcon } from "../../config/taskIcons";

// Formats "18:00" -> "6:00 PM" for display
const formatTime = (time24) => {

  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;

  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;

};

function RoutineSchedule() {

  const { darkMode } = useTheme();
  const { showToast } = useToast();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const response = await api.get("/challenge/routine", {
        timeout: 8000,
      });

      setTasks(response.data.tasks || []);

    } catch (error) {

      console.log("Routine fetch error:", error);
      showToast("Couldn't load the daily routine");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  const startEditing = (task) => {

    setEditingId(task.id);
    setEditLabel(task.label);
    setEditDetail(task.detail);

  };

  const cancelEditing = () => {

    setEditingId(null);
    setEditLabel("");
    setEditDetail("");

  };

  const saveEditing = async (taskId) => {

    if (!editLabel.trim()) {
      showToast("Task name can't be empty");
      return;
    }

    try {

      setSaving(true);

      await api.put(
        `/challenge/routine/${taskId}`,
        { label: editLabel, detail: editDetail },
        { timeout: 8000 }
      );

      showToast("Task updated");

      cancelEditing();

      await fetchTasks();

    } catch (error) {

      console.log(error.response?.data || error);
      showToast(error.response?.data?.message || "Failed to save task");

    } finally {

      setSaving(false);

    }

  };

  return (
    <div
      className={`rounded-3xl p-6 md:p-8 ${
        darkMode ? "bg-slate-900 border border-slate-800" : "bg-white shadow-xl"
      }`}
    >
      <div className="flex items-center justify-between mb-6">

        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Daily Routine
        </h2>

        <p className={darkMode ? "text-slate-500 text-xs" : "text-gray-400 text-xs"}>
          Times are fixed (they drive your notifications) — names are yours to edit
        </p>

      </div>

      {loading && (
        <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
          Loading routine...
        </p>
      )}

      <div className="space-y-3">

        {tasks.map((task) => {

          const isEditing = editingId === task.id;

          return (
            <div
              key={task.id}
              className={`rounded-2xl p-4 flex flex-col sm:flex-row sm:items-start gap-3 ${
                darkMode ? "bg-slate-950 border border-slate-800" : "bg-gray-50"
              }`}
            >
              <div
                className={`flex items-center gap-2 shrink-0 w-44 font-semibold pt-1 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                <Clock size={16} />
                {formatTime(task.start)} – {formatTime(task.end)}
              </div>

              <div className="flex-1">

                {isEditing ? (

                  <div className="space-y-2">

                    <input
                      type="text"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      placeholder="Task name"
                      className={`w-full rounded-lg border p-2 text-sm font-semibold ${
                        darkMode
                          ? "bg-slate-900 border-slate-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />

                    <textarea
                      value={editDetail}
                      onChange={(e) => setEditDetail(e.target.value)}
                      placeholder="Short description"
                      rows="2"
                      className={`w-full rounded-lg border p-2 text-sm ${
                        darkMode
                          ? "bg-slate-900 border-slate-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />

                    <div className="flex gap-2">

                      <button
                        onClick={() => saveEditing(task.id)}
                        disabled={saving}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition disabled:opacity-60"
                      >
                        <Check size={14} />
                        Save
                      </button>

                      <button
                        onClick={cancelEditing}
                        disabled={saving}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                          darkMode
                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <X size={14} />
                        Cancel
                      </button>

                    </div>

                  </div>

                ) : (

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <p
                        className={`font-bold flex items-center gap-2 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <span>{getTaskIcon(task.id)}</span>
                        {task.label}
                      </p>

                      <p
                        className={`text-sm mt-0.5 ${
                          darkMode ? "text-slate-400" : "text-gray-500"
                        }`}
                      >
                        {task.detail}
                      </p>

                      {task.subTasks && (
                        <ul
                          className={`mt-2 text-sm list-disc list-inside ${
                            darkMode ? "text-slate-400" : "text-gray-500"
                          }`}
                        >
                          {task.subTasks.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}

                    </div>

                    <button
                      onClick={() => startEditing(task)}
                      className={`shrink-0 p-2 rounded-lg transition ${
                        darkMode ? "hover:bg-slate-800" : "hover:bg-gray-200"
                      }`}
                      title="Edit task name"
                    >
                      <Pencil size={16} />
                    </button>

                  </div>

                )}

              </div>

            </div>
          );

        })}

      </div>

    </div>
  );

}

export default RoutineSchedule;