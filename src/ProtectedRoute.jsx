import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  
  // 1. إذا ما مسجلش، صيفطو للـ Login
  if (!user) return <Navigate to="/login" replace />;
  
  // 2. إذا كان أدمن، خليه يدوز نيشان (باش ما يوقعش Loop مع الـ AdminRoute)
  if (user.is_admin === 1) return <Outlet />;

  // 3. إذا كان مستخدم عادي، خليه يدوز
  return <Outlet />;
}