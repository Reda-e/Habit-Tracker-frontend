import { useState } from "react";
import { useAuth } from "../AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordConfirmation,setPasswordConfirmation] = useState("");
  const [error,setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    try {

      // Sanctum CSRF
      await api.get("/sanctum/csrf-cookie");

      const res = await api.post("/api/register",{
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });

      login(res.data.user);

      navigate("/");

    } catch(err) {

      setError(err?.response?.data?.message || "Register failed");

    }

  };

  return (

    <div className="p-4 max-w-sm mx-auto">

      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="p-2 border"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="p-2 border"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="p-2 border"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e)=>setPasswordConfirmation(e.target.value)}
          className="p-2 border"
        />

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <button className="bg-green-500 text-white p-2 mt-2">
          Register
        </button>

      </form>

    </div>

  );

}