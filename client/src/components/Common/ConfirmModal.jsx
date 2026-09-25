function ConfirmModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "blue",
  loading = false,
}) {
  if (!isOpen) return null;

  const confirmColorClasses = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={() => {
        if (!loading) {
          onCancel();
        }
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mb-6 text-gray-600">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          {/* Cancel */}
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="rounded-xl border border-gray-300 bg-white px-5 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`rounded-xl px-5 py-2 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              confirmColorClasses[confirmColor] ||
              confirmColorClasses.blue
            }`}
          >
            {loading ? "Please wait..." : confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
