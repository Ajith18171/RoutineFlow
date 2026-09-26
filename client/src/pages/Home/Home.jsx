import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Hero from "../../components/Hero/Hero";
import Stats from "../../components/Stats/Stats";
import Features from "../../components/Features/Features";
import Workflow from "../../components/Workflow/Workflow";
import EmptyState from "../../components/EmptyState/EmptyState";

import { useTheme } from "../../Context/ThemeContext";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { darkMode } = useTheme();

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

      <Hero />
      <Stats />
       <Features />
      <Workflow />
      <EmptyState />
    </div>
  );
}

export default Home;