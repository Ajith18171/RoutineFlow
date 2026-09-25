import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full transition ${
        darkMode
          ? "bg-slate-800 text-yellow-400"
          : "bg-white text-slate-700 shadow-lg"
      }`}
    >
      {darkMode ? (
        <Sun size={22} />
      ) : (
        <Moon size={22} />
      )}
    </button>
  );
}

export default ThemeToggle;