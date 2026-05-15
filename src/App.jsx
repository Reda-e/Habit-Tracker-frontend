import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Habits from "./pages/Habits";
import HabitLogs from "./pages/HabitLogs";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetails from "./pages/UserDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword"; 
import ResetPassword from "./pages/ResetPassword"; 
import GuestRoute from "./GuestRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow p-4">
            <Routes>
    
    <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> 
    </Route>

    
    <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Habits />} />
        <Route path="/logs" element={<HabitLogs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
    </Route>

   
    <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users/:id/details" element={<UserDetails />} />
    </Route>

   
    <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}