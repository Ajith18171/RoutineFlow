import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useTheme } from "../../context/ThemeContext";
import {
  User,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

function Profile() {
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className={`min-h-screen ${
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

      <div className="max-w-5xl mx-auto px-6 py-8">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div
          className={`rounded-3xl p-8 ${
            darkMode
              ? "bg-slate-900 border border-slate-800"
              : "bg-white shadow-lg"
          }`}
        >
          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-3xl font-bold mt-5">
              {user?.username}
            </h2>

            <p className="opacity-70">
              RoutineFlow User
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div
              className={`rounded-xl p-5 ${
                darkMode
                  ? "bg-slate-950"
                  : "bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Mail className="text-blue-500" />
                <span>Email</span>
              </div>

              <p>{user?.email}</p>
            </div>

            <div
              className={`rounded-xl p-5 ${
                darkMode
                  ? "bg-slate-950"
                  : "bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Phone className="text-green-500" />
                <span>Phone</span>
              </div>

              <p>{user?.phone}</p>
            </div>

            <div
              className={`rounded-xl p-5 ${
                darkMode
                  ? "bg-slate-950"
                  : "bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <User className="text-purple-500" />
                <span>Username</span>
              </div>

              <p>{user?.username}</p>
            </div>

            <div
              className={`rounded-xl p-5 ${
                darkMode
                  ? "bg-slate-950"
                  : "bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-orange-500" />
                <span>Member</span>
              </div>

              <p>RoutineFlow User</p>
            </div>
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
        </div>

      </div>
    </div>
  );
}

export default Profile;