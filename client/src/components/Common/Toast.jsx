import { CheckCircle, XCircle, Info } from "lucide-react";

function Toast({ message, type }) {
  const icon =
    type === "success" ? (
      <CheckCircle size={22} />
    ) : type === "error" ? (
      <XCircle size={22} />
    ) : (
      <Info size={22} />
    );

  const bg =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600";

  return (
    <div
      className={`fixed top-6 right-6 z-[999] ${bg} text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce`}
    >
      {icon}

      <span>{message}</span>
    </div>
  );
}

export default Toast;