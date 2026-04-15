// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.password_confirmation) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    const res = await register(formData);

    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto h-12 w-12 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-black text-gray-900 tracking-tight">Join Us Today</h1>
        <p className="mt-2 text-sm text-gray-500 font-medium">Start building your better future now.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-gray-200/50 rounded-[2.5rem] border border-gray-100 sm:px-10 transition-all">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-2xl flex items-center gap-2 animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nom complet</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Adresse Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Confirmer</label>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="••••••••"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all active:scale-[0.98] mt-4"
            >
              S'inscrire
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center text-sm">
            <span className="text-gray-500 font-medium">Déjà un compte? </span>
            <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-4">
              Connectez-vous
            </Link>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Protected by Secure Auth System
        </p>
      </div>
    </div>
  );
}