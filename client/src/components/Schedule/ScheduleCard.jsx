import { useState } from "react";
import api from "../../services/api";

import {
  CheckCircle,
  Clock,
  Pencil,
  Trash2,
} from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import ConfirmModal from "../Common/ConfirmModal";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";


function ScheduleCard({
  schedule,
  onDelete,
  onComplete,
}) {

  const { darkMode } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ==========================
  // MODAL STATE
  // ==========================

  const [modalType, setModalType] = useState(null);

  /*
    modalType can be:

    null
    "complete"
    "delete"
  */

  // ==========================
  // STATUS
  // ==========================

  const isCompleted =
    ["complete", "completed"].includes(
      schedule.status?.toLowerCase().trim()
    );

  // ==========================
  // OPEN COMPLETE MODAL
  // ==========================

  const openCompleteModal = () => {

    if (isCompleted) {
      return;
    }

    setModalType("complete");
  };

  // ==========================
  // OPEN DELETE MODAL
  // ==========================

  const openDeleteModal = () => {

    setModalType("delete");
  };

  // ==========================
  // CLOSE MODAL
  // ==========================

  const closeModal = () => {

    setModalType(null);
  };

  // ==========================
  // COMPLETE SCHEDULE
  // ==========================

  const handleComplete = async () => {

    try {

      const response = await api.patch(
        `/schedules/${schedule.id}/complete`
      );

      if (response.data.success) {

        showToast(
          response.data.repeated
            ? "Rescheduled for tomorrow!"
            : "Schedule completed!"
        );

        setModalType(null);

        if (onComplete) {
          onComplete(schedule.id);
        }
      }

    } catch (error) {

      console.log(
        error.response?.data || error
      );

      showToast(
        "Failed to complete schedule"
      );
    }
  };

  // ==========================
  // DELETE SCHEDULE
  // ==========================

  const handleDelete = async () => {

    try {

      await api.delete(
        `/schedules/${schedule.id}`
      );

      showToast(
        "Schedule deleted successfully!"
      );

      setModalType(null);

      if (onDelete) {
        onDelete(schedule.id);
      }

    } catch (error) {

      console.log(
        error.response?.data || error
      );

      showToast(
        "Delete failed"
      );
    }
  };

  // ==========================
  // RETURN
  // ==========================

  return (

    <div
      className={`rounded-2xl p-5 transition-all duration-300 ${
        darkMode
          ? "bg-slate-900 border border-slate-800"
          : "bg-white shadow-md"
      }`}
    >

      {/* ==========================
          HEADER
      ========================== */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold">
            {schedule.title}
          </h2>

          <p className="mt-2 text-sm opacity-80">
            {schedule.task}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {schedule.status}
        </span>

      </div>


      {/* ==========================
          DETAILS
      ========================== */}

      <div className="mt-4 flex items-center gap-6 text-sm">

        <div className="flex items-center gap-2">

          <Clock size={16} />

          {schedule.time}

        </div>

        <div>
          {schedule.date?.split("T")[0]}
        </div>

      </div>


      {/* ==========================
          ACTIONS
      ========================== */}

      <div className="mt-6 flex gap-3">

        {/* COMPLETE */}

        <button
          type="button"
          onClick={openCompleteModal}
          disabled={isCompleted}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition text-white ${
            isCompleted
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >

          <CheckCircle size={18} />

          {isCompleted
            ? "Completed"
            : "Complete"
          }

        </button>


        {/* EDIT */}

        {!isCompleted && (

          <button
            type="button"
            onClick={() =>
              navigate(
                `/schedule/edit/${schedule.id}`
              )
            }
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
          >

            <Pencil size={18} />

            Edit

          </button>

        )}


        {/* DELETE */}

        <button
          type="button"
          onClick={openDeleteModal}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
        >

          <Trash2 size={18} />

          Delete

        </button>

      </div>


      {/* ==========================
          COMPLETE CONFIRM MODAL
      ========================== */}

      <ConfirmModal
        isOpen={modalType === "complete"}

        title="Mark task complete?"

        message={`Is "${schedule.title}" completed? This can't be undone once confirmed.`}

        onCancel={closeModal}

        onConfirm={handleComplete}

        confirmText="Complete"

        cancelText="Cancel"

        confirmColor="green"
      />


      {/* ==========================
          DELETE CONFIRM MODAL
      ========================== */}

      <ConfirmModal
        isOpen={modalType === "delete"}

        title="Delete Schedule?"

        message={`Are you sure you want to delete "${schedule.title}"? This action cannot be undone.`}

        onCancel={closeModal}

        onConfirm={handleDelete}

        confirmText="Delete"

        cancelText="Cancel"

        confirmColor="red"
      />

    </div>
  );
}


export default ScheduleCard;
