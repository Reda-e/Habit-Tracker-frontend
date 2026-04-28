// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginForm } from "../utils/validation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (touched.email) {
      validateField("email", e.target.value);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (touched.password) {
      validateField("password", e.target.value);
    }
  };

  const validateField = (field, value) => {
    const formErrors = validateLoginForm(email, password);
    setErrors(formErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields before submit
    const formErrors = validateLoginForm(email, password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched({ email: true, password: true });
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo or Icon */}
        <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-500 font-medium">Please sign in to your account</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur("email")}
                  className={`block w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:bg-white outline-none transition-all duration-200 placeholder:text-gray-400 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>✗</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur("password")}
                className={`block w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:bg-white outline-none transition-all duration-200 placeholder:text-gray-400 ${
                  errors.password && touched.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
                placeholder="••••••••"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>✗</span> {errors.password}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-sm p-3 rounded-xl animate-shake">
                <div className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex items-center justify-between text-sm">
              <Link to="/forgot-password" name="forgot" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Mot de passe oublié ?
              </Link>
              <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                Créer un compte
              </Link>
            </div>

            {/* Submit Button */}
            <button className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-blue-200 transform active:scale-[0.98] transition-all">
              Login
            </button>
          </form>

          {/* Social login divider (Optional UI) */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="px-4 bg-white text-gray-400 font-bold tracking-widest text-[10px]">Secure Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}