import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import MySchedule from "./pages/MySchedule/MySchedule";
import AddSchedule from "./pages/AddSchedule/AddSchedule";
import EditSchedule from "./pages/EditSchedule/EditSchedule";
import NotFound from "./pages/NotFound/NotFound";
import Reports from "./pages/Reports/Reports";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Settings from "./pages/Settings/Settings";
import ScheduleDetails from "./pages/Schedule/ScheduleDetails";
import NotificationManager from "./components/Common/NotificationManager";
import Streak from "./pages/Streak/Streak";
import Calendar from "./pages/Calendar/Calendar";
import Focus from "./pages/Focus/Focus";
import Challenge from "./pages/Challenge/Challenge";


function App() {
  return (
    <>
      <NotificationManager />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <MySchedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule/add"
          element={
            <ProtectedRoute>
              <AddSchedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule/edit/:id"
          element={
            <ProtectedRoute>
              <EditSchedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule/:id"
          element={
            <ProtectedRoute>
              <ScheduleDetails />
            </ProtectedRoute>
          }
        />
        <Route
  path="/calendar"
  element={
    <ProtectedRoute>
      <Calendar />
    </ProtectedRoute>
  }
/>
<Route

path="/streak"

element={

<ProtectedRoute>

<Streak />

</ProtectedRoute>

}

/>
<Route
  path="/focus"
  element={
    <ProtectedRoute>
      <Focus />
    </ProtectedRoute>
  }
/>

<Route
  path="/challenge"
  element={
    <ProtectedRoute>
      <Challenge />
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </>
  );
}

export default App;
