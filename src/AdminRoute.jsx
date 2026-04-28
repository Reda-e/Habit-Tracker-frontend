import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminRoute() {
  const { user } = useAuth();

  // 1. إلا ما مسجلش، صيفطو للـ login
  if (!user) return <Navigate to="/login" replace />;

  // 2. إلا كان مسجل ولكن ماشي أدمن، رجعو للرئيسية
  if (user.is_admin !== 1) return <Navigate to="/" replace />;

  // 3. أدمن خالص، خليه يدخل
  return <Outlet />;
  
}