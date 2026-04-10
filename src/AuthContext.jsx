/* eslint-disable react-hooks/set-state-in-effect */
// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "./api/axios";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/user").then((res)=>setUser(res.data)).finally(() => setLoading(false));
  }, []);
if (loading) return <div>Loading...</div>;
  // 🔹 Login
  const login = async (email, password) => {
    try {
      // 1️⃣ CSRF token
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // 2️⃣ API login
      const res = await api.post("/login", { email, password });

      // 3️⃣ Save user
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, message: err?.response?.data?.message || "Login failed" };
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Register
  const register = async ({ name, email, password, password_confirmation }) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      // Optionally log the user in immediately
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, message: err?.response?.data?.message || "Register failed" };
    }
  };

  // 🔹 Forgot Password
  const forgotPassword = async (email) => {
    try {
      await api.post("/forgot-password", { email });
      return { success: true, message: "Reset link sent to your email" };
    } catch (err) {
      console.log(err);
      return { success: false, message: err?.response?.data?.message || "Error sending reset link" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}