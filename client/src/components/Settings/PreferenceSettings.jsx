import { useState } from "react";
import { Bell, Moon, Clock, Save } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import useToast from "../../hooks/useToast";

function PreferenceSettings() {
  const { darkMode, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  const handleSave = () => {
    showToast("Preferences saved successfully!");
  };

  return (
    <section
      className={`rounded-3xl p-6 ${
        darkMode
          ? "bg-slate-900 border border-slate-800"
          : "bg-white shadow-lg"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">
        Preferences
      </h2>

      <div className="space-y-6">

        {/* Theme */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="text-blue-500" />
            <div>
              <h3 className="font-semibold">
                Dark Mode
              </h3>
              <p className="text-sm opacity-70">
                Switch between light and dark theme
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-xl transition ${
              darkMode
                ? "bg-blue-600 text-white"
                : "bg-slate-200"
            }`}
          >
            {darkMode ? "Enabled" : "Disabled"}
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="text-green-500" />
            <div>
              <h3 className="font-semibold">
                Notifications
              </h3>
              <p className="text-sm opacity-70">
                Receive schedule notifications
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5"
          />
        </div>

        {/* Reminders */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="text-orange-500" />
            <div>
              <h3 className="font-semibold">
                Task Reminders
              </h3>
              <p className="text-sm opacity-70">
                Enable reminder alerts
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={reminders}
            onChange={() => setReminders(!reminders)}
            className="w-5 h-5"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <Save size={18} />
          Save Preferences
        </button>

      </div>
    </section>
  );
}

export default PreferenceSettings;