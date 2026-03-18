import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/Login";
import Habits from "./pages/Habits";
import HabitLogs from "./pages/HabitLogs";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import Header from "./components/Header";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <Header /> */}
        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={
              <ProtectedRoute><Habits /></ProtectedRoute>
            } />
            <Route path="/logs" element={
              <ProtectedRoute><HabitLogs /></ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute><Notifications /></ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}