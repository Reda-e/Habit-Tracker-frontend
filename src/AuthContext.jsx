// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "./api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // تأكد من الاستيراد


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // تأكد من استخدام useNavigate

  useEffect(() => {
    api.get("/user")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  // 🔹 Login
  const login = async (email, password) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
      });

      const res = await api.post("/login", { email, password });
      console.log(res)
      const loggedUser = res.data.user;
      console.log(loggedUser)
      setUser(loggedUser);
   if (loggedUser.is_admin === 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      return { success: true };
    } catch (err) {
      console.log(err);
      let message = "Login failed";
      
      // Handle backend validation errors
      if (err?.response?.data?.errors) {
        const errors = err.response.data.errors;
        message = Object.values(errors).flat().join(", ");
      } else if (err?.response?.data?.message) {
        message = err.response.data.message;
      }
      
      return { success: false, message };
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = "/login";
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
        name, email, password, password_confirmation,
      });

      const registeredUser = res.data.user;
      setUser(registeredUser);
      

     

      return { success: true };
    } catch (err) {
      console.log(err);
      let message = "Register failed";
      
      // Handle backend validation errors
      if (err?.response?.data?.errors) {
        const errors = err.response.data.errors;
        message = Object.values(errors).flat().join(", ");
      } else if (err?.response?.data?.message) {
        message = err.response.data.message;
      }
      
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}