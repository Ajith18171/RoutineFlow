import { useEffect, useState } from "react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import PerformanceStats from "../../components/Reports/PerformanceStats";
import ReportCards from "../../components/Reports/ReportCards";
import WeeklyChart from "../../components/Reports/WeeklyChart";
import MonthlyChart from "../../components/Reports/MonthlyChart";


function Reports() {

  const { darkMode } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0,
    completionRate: 0,
  });

  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchReports();

  }, []);


  const fetchReports = async () => {

    try {

      setLoading(true);

      // Backend returns stats + weekly + monthly together from
      // this one call — no separate endpoints needed
      const response = await api.get("/reports");

      setStats(response.data.stats);
      setWeeklyData(response.data.weekly || []);
      setMonthlyData(response.data.monthly || []);

    } catch (error) {

      console.log(error.response?.data || error);

    } finally {

      setLoading(false);

    }

  };


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

      <section className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        <div>
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Reports
          </h1>

          <p
            className={`mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Analyze your schedules and monitor your productivity.
          </p>
        </div>

        {loading ? (

          <div
            className={`text-center py-16 ${
              darkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Loading reports...
          </div>

        ) : (

          <>

            <ReportCards />

            <PerformanceStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <WeeklyChart data={weeklyData} />

              <MonthlyChart data={monthlyData} />

            </div>

          </>

        )}
      <div className="flex justify-end mt-6">
  <button
    onClick={() => (window.location.href = "/dashboard")}
    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 ${
      darkMode
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }`}
  >
    ← Go to Dashboard
  </button>
</div>

      </section>

    </div>
    

  );

}

export default Reports;