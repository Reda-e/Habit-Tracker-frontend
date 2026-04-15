import { useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/forgot-password", { email });
      console.log("SUCCESS:", res); 
      setMessage({ text: res.data.message, type: "success" });
    } catch (err) {
      console.log("FULL ERROR:", err); 
      console.log("RESPONSE:", err.response); 
      setMessage({ text: "Error sending email. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-black text-gray-900 tracking-tight">
          Mot de Passe Oublié?
        </h1>
        <p className="mt-2 text-sm text-gray-500 font-medium max-w-[280px] mx-auto">
          Enter your registered email to receive a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-gray-200/50 rounded-[2.5rem] border border-gray-100 sm:px-10">
          
          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-2xl text-sm font-semibold border animate-fade-in ${
              message.type === "success" 
                ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                : "bg-red-50 border-red-100 text-red-600"
            }`}>
              <div className="flex items-center gap-2">
                <span>{message.type === "success" ? "✅" : "⚠️"}</span>
                {message.text || message}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] flex justify-center items-center ${
                loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-200 hover:shadow-blue-300"
              }`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <Link to="/login" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}