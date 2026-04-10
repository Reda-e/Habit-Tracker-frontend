// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../AuthContext";
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

    const res = await login(email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
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
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-between text-sm mt-2">
          <Link to="/forgot-password" className="text-blue-500">
            Mot de passe oublié ?
          </Link>
          <Link to="/register" className="text-green-500">
            Créer un compte
          </Link>
        </div>

        <button className="bg-blue-500 text-white p-2 mt-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
}