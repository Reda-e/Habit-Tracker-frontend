// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { validateRegisterForm, validatePassword } from "../utils/validation";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field in real-time if it's been touched
    if (touched[name]) {
      validateField(name);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    const formErrors = validateRegisterForm(
      formData.name,
      formData.email,
      formData.password,
      formData.password_confirmation
    );
    setErrors(formErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    const formErrors = validateRegisterForm(
      formData.name,
      formData.email,
      formData.password,
      formData.password_confirmation
    );

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched({
        name: true,
        email: true,
        password: true,
        password_confirmation: true,
      });
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
                onBlur={() => handleBlur("name")}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:bg-white outline-none transition-all placeholder:text-gray-300 ${
                  errors.name && touched.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>✗</span> {errors.name}
                </p>
              )}
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
                onBlur={() => handleBlur("email")}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:bg-white outline-none transition-all placeholder:text-gray-300 ${
                  errors.email && touched.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>✗</span> {errors.email}
                </p>
              )}
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
                  onBlur={() => handleBlur("password")}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:bg-white outline-none transition-all ${
                    errors.password && touched.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>✗</span> {errors.password}
                  </p>
                )}
                {touched.password && !errors.password && formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      <div className="h-1 flex-1 bg-green-500 rounded"></div>
                      <div className="h-1 flex-1 bg-green-500 rounded"></div>
                      <div className="h-1 flex-1 bg-green-500 rounded"></div>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">Mot de passe fort ✓</p>
                  </div>
                )}
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
                  onBlur={() => handleBlur("password_confirmation")}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:bg-white outline-none transition-all ${
                    errors.password_confirmation && touched.password_confirmation
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                />
                {errors.password_confirmation && touched.password_confirmation && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>✗</span> {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>

            {/* Password Requirements Helper */}
            {touched.password && formData.password && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-bold text-blue-900 uppercase">Exigences du mot de passe:</p>
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${formData.password.length >= 8 ? "text-green-600" : "text-gray-500"}`}>
                    <span>{formData.password.length >= 8 ? "✓" : "○"}</span>
                    <span>Au moins 8 caractères</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}`}>
                    <span>{/[A-Z]/.test(formData.password) ? "✓" : "○"}</span>
                    <span>Au moins une lettre majuscule (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${/[a-z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}`}>
                    <span>{/[a-z]/.test(formData.password) ? "✓" : "○"}</span>
                    <span>Au moins une lettre minuscule (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${/[0-9]/.test(formData.password) ? "text-green-600" : "text-gray-500"}`}>
                    <span>{/[0-9]/.test(formData.password) ? "✓" : "○"}</span>
                    <span>Au moins un chiffre (0-9)</span>
                  </div>
                </div>
              </div>
            )}

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