import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";


function ScheduleForm() {
  const { darkMode } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

const isEditMode = Boolean(id);

  // Shared classes so every field (input/select/textarea) stays in sync
  // across light and dark mode, matching the styling already used in
  // ScheduleList.jsx
  const fieldClass = `w-full mt-2 rounded-xl border p-3 transition ${
    darkMode
      ? "bg-slate-950 border-slate-700 text-white placeholder-slate-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
  }`;

  const labelClass = `font-medium ${
    darkMode ? "text-slate-300" : "text-gray-700"
  }`;

  const [formData, setFormData] = useState({
    title: "",
    task: "",
    category: "Personal",
    date: "",
    time: "",
    priority: "Medium",
    description: "",
    repeat: false,
    repeat_until: "",
    reminder: false,
  });
 useEffect(() => {
  if (!isEditMode) return;

  const fetchSchedule = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/schedules/${id}`);;

      const schedule = response.data.schedule;

      setFormData({
        title: schedule.title,
        task: schedule.task,
        category: schedule.category,
        date: schedule.date?.split("T")[0] || "",
        time: schedule.time,
        priority: schedule.priority,
        description: schedule.description || "",
        repeat: Boolean(schedule.repeat_task),
        repeat_until: schedule.repeat_until?.split("T")[0] || "",
        reminder: Boolean(schedule.reminder),
      });
    } catch (error) {
      console.error(error);
      showToast("Failed to load schedule");
    }
  };

  fetchSchedule();
}, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {

      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // If repeat gets turned off, clear any end date so a stale
      // value doesn't silently get saved with it
      if (name === "repeat" && !checked) {
        updated.repeat_until = "";
      }

      return updated;

    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const scheduleData = {
      ...formData,
      repeat_task: formData.repeat,
      repeat_until: formData.repeat
        ? formData.repeat_until || null
        : null,
      reminder: formData.reminder,
    };

    delete scheduleData.repeat;

    let response;

    if (isEditMode) {

      response = await api.put(
        `/schedules/${id}`,
        scheduleData
      );

      showToast("Schedule Updated Successfully!");

    } else {

      response = await api.post(
        "/schedules",
        scheduleData
      );

      showToast("Schedule Saved Successfully!");

    }

    if (response.data.success) {
      navigate("/schedule");
    }

  } catch (error) {

    console.error("Schedule error:", error.response?.data || error);

    showToast(
      error.response?.data?.message || "Operation failed"
    );

  }
};
  return (
    <section className="max-w-3xl mx-auto px-6 py-10">

      <div
        className={`rounded-3xl p-8 ${
          darkMode
            ? "bg-slate-900 border border-slate-800"
            : "bg-white shadow-xl"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
  {isEditMode ? "Edit Schedule" : "Add New Schedule"}
</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className={labelClass}>Schedule Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Morning Routine"
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass}>Task Name</label>

            <input
              type="text"
              name="task"
              value={formData.task}
              onChange={handleChange}
              placeholder="Gym Workout"
              className={fieldClass}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className={labelClass}>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={fieldClass}
              >
                <option>Personal</option>
                <option>Work</option>
                <option>Study</option>
                <option>Health</option>
              </select>

            </div>

            <div>

              <label className={labelClass}>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={fieldClass}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className={labelClass}>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`${fieldClass} ${
                  darkMode ? "[color-scheme:dark]" : ""
                }`}
              />

            </div>

            <div>

              <label className={labelClass}>Time</label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`${fieldClass} ${
                  darkMode ? "[color-scheme:dark]" : ""
                }`}
              />

            </div>

          </div>

          <div>

            <label className={labelClass}>Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={fieldClass}
            />

          </div>

          <div className="flex flex-col gap-3">

            <label
              className={
                darkMode ? "text-slate-300" : "text-gray-700"
              }
            >
              <input
                type="checkbox"
                name="repeat"
                checked={formData.repeat}
                onChange={handleChange}
                className="accent-blue-600"
              />

              <span className="ml-2">
                Repeat Everyday
              </span>

            </label>

            {formData.repeat && (

              <div className="pl-6">

                <label className={labelClass}>
                  Repeat Until (optional — leave blank to repeat forever)
                </label>

                <input
                  type="date"
                  name="repeat_until"
                  value={formData.repeat_until}
                  min={formData.date || undefined}
                  onChange={handleChange}
                  className={`${fieldClass} ${
                    darkMode ? "[color-scheme:dark]" : ""
                  }`}
                />

              </div>

            )}

            <label
              className={
                darkMode ? "text-slate-300" : "text-gray-700"
              }
            >

              <input
                type="checkbox"
                name="reminder"
                checked={formData.reminder}
                onChange={handleChange}
                className="accent-blue-600"
              />

              <span className="ml-2">
                Reminder Notification
              </span>

            </label>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
          >
            {isEditMode ? "Update Schedule" : "Save Schedule"}
          </button>
         <button
  type="button"
  onClick={() => navigate("/dashboard")}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
>
  ← Go to Dashboard
</button>
          

        </form>

      </div>

    </section>
  );
}

export default ScheduleForm;