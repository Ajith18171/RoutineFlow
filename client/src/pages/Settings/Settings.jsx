import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useTheme } from "../../Context/ThemeContext";

import AccountSettings from "../../components/Settings/AccountSettings";
import SecuritySettings from "../../components/Settings/SecuritySettings";
import PreferenceSettings from "../../components/Settings/PreferenceSettings";

function Settings() {
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-gray-900"
      }`}
    >
      <Navbar openSidebar={() => setSidebarOpen(true)} />

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-2">
          Settings
        </h1>

        <p className="opacity-70 mb-8">
          Manage your account, security and preferences.
        </p>

        <div className="space-y-8">
          <AccountSettings />
          <SecuritySettings />
          <PreferenceSettings />
        </div>
      </div>
    </div>
  );
}

export default Settings;