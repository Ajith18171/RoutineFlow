import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScheduleForm from "../../components/Schedule/ScheduleForm";

function EditSchedule() {
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
      <Navbar
        openSidebar={() => setSidebarOpen(true)}
      />

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <ScheduleForm />
    </div>
  );
}

export default EditSchedule;