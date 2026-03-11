import { useState } from "react";
import { useAuth } from "../AuthContext";
import api from "../api/axios.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ جلب CSRF cookie
      await api.get("/sanctum/csrf-cookie");
      // 2️⃣ ارسال request login
      const res = await api.post("/api/login", {email,password});
      console.log(res.data);
      login(res.data.user); // خزّن user فـ context

    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border" />
        <button className="bg-blue-500 text-white p-2 mt-2">Login</button>
      </form>
    </div>
  );
}