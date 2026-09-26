import { useEffect, useState } from "react";

import WelcomeBanner from "../../components/Dashboard/WelcomeBanner";
import DashboardCards from "../../components/Dashboard/DashboardCards";
import QuickActions from "../../components/Dashboard/QuickActions";
import RecentSchedules from "../../components/Dashboard/RecentSchedules";
import TodaysTasks from "../../components/Dashboard/TodaysTasks";
import UpcomingReminders from "../../components/Dashboard/UpcomingReminders";
import Analytics from "../../components/Dashboard/Analytics";
import ChallengeTracker from "../../components/Challenge/ChallengeTracker";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import { useTheme } from "../../Context/ThemeContext";
import LogoutButton from "../../components/Common/LogoutButton";

import api from "../../services/api";


function Dashboard() {

  const { darkMode } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0,
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // ==========================
  // FETCH DASHBOARD STATS
  // ==========================

  const fetchDashboard = async () => {

    try {

      const response = await api.get(
        "/dashboard/stats"
      );

      const dashboardStats =
        response.data.stats || {};

      setStats({

        total:
          Number(dashboardStats.total) || 0,

        completed:
          Number(dashboardStats.completed) || 0,

        pending:
          Number(dashboardStats.pending) || 0,

        highPriority:
          Number(dashboardStats.highPriority) || 0,

      });

    } catch (error) {

      console.log(
        "Dashboard Error:",
        error
      );

    }

  };


  // ==========================
  // REFRESH ALL DASHBOARD DATA
  // ==========================

  const refreshDashboard = async () => {

    // Refresh dashboard cards
    await fetchDashboard();

    // Change key so child components fetch again
    setRefreshKey((previous) => previous + 1);

  };


  // ==========================
  // INITIAL LOAD
  // ==========================

  useEffect(() => {

    fetchDashboard();

  }, []);


  // ==========================
  // RETURN
  // ==========================

  return (

    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-gray-900"
      }`}
    >

      {/* Navbar */}

      <Navbar
        openSidebar={() =>
          setSidebarOpen(true)
        }
      />


      {/* Sidebar */}

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() =>
          setSidebarOpen(false)
        }
      />


      {/* Header */}

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center py-6">

          <div>

            <p
              className={`text-sm font-medium tracking-wide uppercase ${
                darkMode
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              Dashboard
            </p>

            <h1 className="text-2xl md:text-3xl font-bold mt-0.5">
              Welcome back, {user?.username} 👋
            </h1>

          </div>

          <LogoutButton />

        </div>

      </div>


      {/* Dashboard */}

      <div className="space-y-8 pb-12">

        <WelcomeBanner />


        {/* Dashboard Cards */}

        <DashboardCards
          stats={stats}
        />


        {/* 90 Day Challenge */}

        <div className="max-w-7xl mx-auto px-6">

          <ChallengeTracker
            onStatsChanged={refreshDashboard}
          />

        </div>


        {/* Analytics */}

        <div className="max-w-7xl mx-auto px-6">

          <Analytics />

        </div>


        {/* Today's Tasks + Upcoming Reminders */}

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

          <TodaysTasks
            refreshKey={refreshKey}
          />

          <UpcomingReminders
            refreshKey={refreshKey}
          />

        </div>


        {/* Recent Schedules */}

        <RecentSchedules
          refreshKey={refreshKey}
        />


        {/* Quick Actions */}

        <QuickActions />

      </div>

    </div>

  );

}


export default Dashboard;
