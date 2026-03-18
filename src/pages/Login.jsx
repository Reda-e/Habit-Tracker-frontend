import { useState } from "react";
import { useAuth } from "../AuthContext";
import api from "../api/axios";
import axios from "axios"; // 👈 مهم
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ CSRF صحيح
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // ✅ LOGIN
      const res = await api.post("/login", { email, password });

      login(res.data.user);
      navigate("/");

    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">

      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="p-2 border"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="p-2 border"
        />

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-blue-500">
            Mot de passe oublié ?
          </Link>

          <Link to="/register" className="text-green-500">
            Create account
          </Link>
        </div>

        <button className="bg-blue-500 text-white p-2 mt-2">
          Login
        </button>

      </form>
    </div>
  );
}