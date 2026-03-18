import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation,
      });

      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>

      {message && <p className="mb-2 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="p-2 border"
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={password_confirmation}
          onChange={(e)=>setPasswordConfirmation(e.target.value)}
          className="p-2 border"
        />

        <button className="bg-blue-500 text-white p-2">
          Reset Password
        </button>

      </form>
    </div>
  );
}