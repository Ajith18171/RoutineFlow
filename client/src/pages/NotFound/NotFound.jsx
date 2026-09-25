import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function NotFound() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-lg w-full rounded-3xl p-10 text-center ${
          darkMode
            ? "bg-slate-900 border border-slate-800"
            : "bg-white shadow-xl"
        }`}
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="text-red-500" size={42} />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold mb-2">404</h1>

        <h2 className="text-2xl font-bold mb-3">
          Page Not Found
        </h2>

        <p
          className={`mb-8 ${
            darkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <Home size={20} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;