import { useEffect, useState } from "react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";
import useToast from "../../hooks/useToast";

function ScheduleList() {
  const { darkMode } = useTheme();
  const { showToast } = useToast();

  // ==========================
  // STATES
  // ==========================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const [schedules, setSchedules] = useState([]);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Complete confirmation
  const [completeTarget, setCompleteTarget] = useState(null);
  const [completing, setCompleting] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    high: 0,
  });

  // ==========================
  // HELPER
  // ==========================

  const isCompleted = (status) => {
    return ["complete", "completed"].includes(
      status?.toLowerCase().trim()
    );
  };

  // ==========================
  // FETCH SCHEDULES
  // ==========================

  const fetchSchedules = async () => {
    try {
      setLoading(true);

      const response = await api.get("/schedules", {
        params: {
          search,
          status,
          priority,
          sort,
          page,
          limit,
        },
      });

      const data = response.data;

      setSchedules(data.schedules || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.log(error.response?.data || error);

      showToast("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // FETCH STATS
  // ==========================

  const fetchStats = async () => {
    try {
      const response = await api.get("/schedules/stats");

      const s = response.data.stats || {};

      setStats({
        total: s.totalTasks || 0,
        pending: s.pendingTasks || 0,
        completed: s.completedTasks || 0,
        high: s.highPriority || 0,
      });
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // ==========================
  // LOAD DATA
  // ==========================

  useEffect(() => {
    fetchSchedules();
    fetchStats();
  }, [
    search,
    status,
    priority,
    sort,
    page,
  ]);

  // ==========================
  // OPEN COMPLETE MODAL
  // ==========================

  const handleComplete = (schedule) => {
    setCompleteTarget(schedule);
  };

  // ==========================
  // CONFIRM COMPLETE
  // ==========================

  const confirmComplete = async () => {
    if (!completeTarget) return;

    try {
      setCompleting(true);

      const response = await api.patch(
        `/schedules/${completeTarget.id}/complete`
      );

      if (response.data.success) {
        await fetchSchedules();
        await fetchStats();

        showToast(
          response.data.repeated
            ? "Rescheduled for tomorrow!"
            : "Schedule completed!"
        );
      }
    } catch (error) {
      console.log(
        error.response?.data || error
      );

      showToast("Complete failed");
    } finally {
      setCompleting(false);
      setCompleteTarget(null);
    }
  };

  // ==========================
  // OPEN DELETE MODAL
  // ==========================

  const handleDelete = (schedule) => {
    setDeleteTarget(schedule);
  };

  // ==========================
  // CONFIRM DELETE
  // ==========================

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const response = await api.delete(
        `/schedules/${deleteTarget.id}`
      );

      if (response.data.success) {
        if (
          schedules.length === 1 &&
          page > 1
        ) {
          setPage(page - 1);
        } else {
          await fetchSchedules();
        }

        await fetchStats();

        showToast("Schedule deleted!");
      }
    } catch (error) {
      console.log(
        error.response?.data || error
      );

      showToast("Delete failed");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // ==========================
  // RETURN
  // ==========================

  return (
    <section className="w-[90%] xl:w-[85%] mx-auto py-10">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

        <div>
          <h1
            className={`text-4xl font-bold ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            My Schedules
          </h1>

          <p
            className={`mt-2 ${
              darkMode
                ? "text-slate-400"
                : "text-gray-500"
            }`}
          >
            Organize your daily routines and keep
            your productivity on track.
          </p>
        </div>

        <div className="flex gap-2">

          <Link
            to="/schedule/add"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg"
          >
            + Add Schedule
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg"
          >
            ← Go to Dashboard
          </Link>

        </div>

      </div>


      {/* ==========================
          STATS
      ========================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <div
          className={`rounded-2xl p-6 shadow ${
            darkMode
              ? "bg-slate-900 border border-slate-800"
              : "bg-white"
          }`}
        >
          <h4 className="text-sm text-gray-500">
            Total Tasks
          </h4>

          <h2 className="text-3xl font-bold mt-2">
            {stats.total}
          </h2>
        </div>


        <div
          className={`rounded-2xl p-6 shadow ${
            darkMode
              ? "bg-slate-900 border border-slate-800"
              : "bg-white"
          }`}
        >
          <h4 className="text-sm text-gray-500">
            Pending
          </h4>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {stats.pending}
          </h2>
        </div>


        <div
          className={`rounded-2xl p-6 shadow ${
            darkMode
              ? "bg-slate-900 border border-slate-800"
              : "bg-white"
          }`}
        >
          <h4 className="text-sm text-gray-500">
            Completed
          </h4>

          <h2 className="text-3xl font-bold text-green-500 mt-2">
            {stats.completed}
          </h2>
        </div>


        <div
          className={`rounded-2xl p-6 shadow ${
            darkMode
              ? "bg-slate-900 border border-slate-800"
              : "bg-white"
          }`}
        >
          <h4 className="text-sm text-gray-500">
            High Priority
          </h4>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {stats.high}
          </h2>
        </div>

      </div>


      {/* ==========================
          SEARCH / FILTER / SORT
      ========================== */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-8">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search schedules..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-white border-gray-300"
            }`}
          />

        </div>


        {/* Status */}

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className={`rounded-xl border px-4 py-3 ${
            darkMode
              ? "bg-slate-900 border-slate-700 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>


        {/* Priority */}

        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            setPage(1);
          }}
          className={`rounded-xl border px-4 py-3 ${
            darkMode
              ? "bg-slate-900 border-slate-700 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="">
            All Priority
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>


        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className={`rounded-xl border px-4 py-3 ${
            darkMode
              ? "bg-slate-900 border-slate-700 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="date_asc">
            Date ↑
          </option>

          <option value="date_desc">
            Date ↓
          </option>

          <option value="priority">
            Priority
          </option>
        </select>

      </div>


      {/* ==========================
          TABLE
      ========================== */}

      <div
        className={`rounded-3xl overflow-hidden shadow-xl ${
          darkMode
            ? "bg-slate-900 border border-slate-800"
            : "bg-white"
        }`}
      >

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                className={
                  darkMode
                    ? "bg-slate-950 text-slate-300"
                    : "bg-gray-50 text-gray-600"
                }
              >
                <th className="px-6 py-5 text-left">
                  Title
                </th>

                <th className="px-6 py-5 text-left">
                  Task
                </th>

                <th className="px-6 py-5 text-left">
                  Status
                </th>

                <th className="px-6 py-5 text-left">
                  Priority
                </th>

                <th className="px-6 py-5 text-left">
                  Time
                </th>

                <th className="px-6 py-5 text-left">
                  Date
                </th>

                <th className="px-6 py-5 text-center">
                  Actions
                </th>
              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="7"
                    className="py-16 text-center text-gray-500"
                  >
                    Loading schedules...
                  </td>
                </tr>

              ) : schedules.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="py-16 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">

                      <div className="text-6xl mb-3">
                        📅
                      </div>

                      <h2 className="text-xl font-semibold">
                        No schedules found
                      </h2>

                      <p className="mt-2">
                        Create a new schedule to get started.
                      </p>

                    </div>
                  </td>
                </tr>

              ) : (

                schedules.map((schedule) => (

                  <tr
                    key={schedule.id}
                    className={`transition duration-300 ${
                      darkMode
                        ? "border-t border-slate-800 hover:bg-slate-800"
                        : "border-t hover:bg-blue-50"
                    }`}
                  >

                    {/* Title */}

                    <td className="px-6 py-5">

                      <Link
                        to={`/schedule/${schedule.id}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {schedule.title}
                      </Link>

                    </td>


                    {/* Task */}

                    <td className="px-6 py-5">

                      <p className="truncate max-w-xs opacity-80">
                        {schedule.task}
                      </p>

                    </td>


                    {/* Status */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isCompleted(schedule.status)
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {schedule.status}
                      </span>

                    </td>


                    {/* Priority */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          schedule.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : schedule.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {schedule.priority}
                      </span>

                    </td>


                    {/* Time */}

                    <td className="px-6 py-5">
                      {schedule.time}
                    </td>


                    {/* Date */}

                    <td className="px-6 py-5">
                      {schedule.date?.split("T")[0]}
                    </td>


                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-2">

                        {/* Complete */}

                        <button
                          type="button"
                          disabled={isCompleted(schedule.status)}
                          onClick={() =>
                            handleComplete(schedule)
                          }
                          className={`p-2 rounded-lg text-white transition ${
                            isCompleted(schedule.status)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          <CheckCircle size={18} />
                        </button>


                        {/* Edit */}

                        {!isCompleted(schedule.status) && (

                          <Link
                            to={`/schedule/edit/${schedule.id}`}
                            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                          >
                            <Pencil size={18} />
                          </Link>

                        )}


                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(schedule)
                          }
                          className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==========================
          PAGINATION
      ========================== */}

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-5">

        <div
          className={`text-sm ${
            darkMode
              ? "text-slate-400"
              : "text-gray-500"
          }`}
        >
          Showing Page <strong>{page}</strong> of{" "}
          <strong>{totalPages}</strong>
        </div>


        <div className="flex items-center gap-2">

          {/* Previous */}

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Previous
          </button>


          {/* Page Numbers */}

          {Array.from(
            { length: totalPages },
            (_, index) => (

              <button
                key={index}
                onClick={() =>
                  setPage(index + 1)
                }
                className={`w-10 h-10 rounded-xl font-semibold transition ${
                  page === index + 1
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>

            )
          )}


          {/* Next */}

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage(page + 1)
            }
            className={`px-4 py-2 rounded-xl font-medium transition ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Next
          </button>

        </div>

      </div>


      {/* ==========================
          FOOTER
      ========================== */}

      <div
        className={`mt-10 text-center text-sm ${
          darkMode
            ? "text-slate-500"
            : "text-gray-500"
        }`}
      >
        RoutineFlow • Smart Task & Routine Management
      </div>


      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {deleteTarget && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() =>
            !deleting &&
            setDeleteTarget(null)
          }
        >

          {/* Backdrop */}

          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />


          {/* Modal */}

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className={`relative w-full max-w-sm rounded-2xl shadow-2xl p-6 ${
              darkMode
                ? "bg-slate-900 border border-slate-800"
                : "bg-white"
            }`}
          >

            <div className="flex flex-col items-center text-center">

              {/* Icon */}

              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">

                <Trash2
                  size={26}
                  className="text-red-600"
                />

              </div>


              {/* Title */}

              <h3
                className={`text-lg font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                Delete Schedule?
              </h3>


              {/* Message */}

              <p
                className={`mt-2 text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
              >
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  "{deleteTarget.title}"
                </span>
                ? This action cannot be undone.
              </p>


              {/* Buttons */}

              <div className="flex gap-3 w-full mt-6">

                <button
                  type="button"
                  disabled={deleting}
                  onClick={() =>
                    setDeleteTarget(null)
                  }
                  className={`flex-1 py-2.5 rounded-xl font-medium transition ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>


                <button
                  type="button"
                  disabled={deleting}
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-xl font-semibold bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deleting
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          COMPLETE CONFIRMATION MODAL
      ===================================================== */}

      {completeTarget && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() =>
            !completing &&
            setCompleteTarget(null)
          }
        >

          {/* Backdrop */}

          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />


          {/* Modal */}

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className={`relative w-full max-w-sm rounded-2xl shadow-2xl p-6 ${
              darkMode
                ? "bg-slate-900 border border-slate-800"
                : "bg-white"
            }`}
          >

            <div className="flex flex-col items-center text-center">

              {/* Icon */}

              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">

                <CheckCircle
                  size={26}
                  className="text-green-600"
                />

              </div>


              {/* Title */}

              <h3
                className={`text-lg font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                Mark task complete?
              </h3>


              {/* Message */}

              <p
                className={`mt-2 text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
              >
                Is{" "}
                <span className="font-semibold">
                  "{completeTarget.title}"
                </span>{" "}
                completed? This can't be undone once confirmed.
              </p>


              {/* Buttons */}

              <div className="flex gap-3 w-full mt-6">

                {/* Cancel */}

                <button
                  type="button"
                  disabled={completing}
                  onClick={() =>
                    setCompleteTarget(null)
                  }
                  className={`flex-1 py-2.5 rounded-xl font-medium transition ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>


                {/* Complete */}

                <button
                  type="button"
                  disabled={completing}
                  onClick={confirmComplete}
                  className="flex-1 py-2.5 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {completing
                    ? "Completing..."
                    : "Complete"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default ScheduleList;
