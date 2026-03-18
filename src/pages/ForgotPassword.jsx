import { useState } from "react";
import api from "../api/axios.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgot-password", { email });
      console.log("SUCCESS:", res); // 👈 نشوفو واش جا response
      setMessage(res.data.message);
    } catch (err) {
      console.log("FULL ERROR:", err); // 👈 error كامل
      console.log("RESPONSE:", err.response); // 👈 واش كاين response
      setMessage("Error sending email");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Mot de Passe Oublié?
      </h1>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border"
        />

        <p className="text-sm text-gray-600">
          Enter your registered email to receive a link to reset your password.
        </p>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}