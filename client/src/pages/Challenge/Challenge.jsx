import { useState } from "react";
import { useTheme } from "../../Context/ThemeContext";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChallengeTracker from "../../components/Challenge/ChallengeTracker";
import RoutineSchedule from "../../components/Challenge/RoutineSchedule";
import ChallengeNotes from "../../components/Challenge/ChallengeNotes";

function Challenge() {

  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-gray-900"
      }`}
    >
      <Navbar openSidebar={() => setSidebarOpen(true)} />

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <ChallengeTracker />
        <RoutineSchedule />
        <ChallengeNotes />
      </div>
    </div>
  );

}

export default Challenge;