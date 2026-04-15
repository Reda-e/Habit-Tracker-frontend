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
  const [loading, setLoading] = useState(false); // إضافة حالة تحميل للجمالية

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation,
      });

      setMessage(res.data.message);
      // استخدام لون نجاح إذا نجحت العملية
      const successMsg = res.data.message;
      setMessage({ text: successMsg, type: "success" });
      
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* أيقونة القفل العلوي */}
        <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Secure Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your new password below to regain access.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
          
          {/* عرض الرسالة بتصميم ملون */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium border animate-fade-in ${
              message.type === "success" 
                ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                : "bg-red-50 border-red-100 text-red-700"
            }`}>
              <div className="flex items-center">
                <span className="mr-2">{message.type === "success" ? "✅" : "❌"}</span>
                {message.text || message}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all duration-200 placeholder:text-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all duration-200 placeholder:text-gray-300"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white transition-all duration-200 transform active:scale-[0.98] ${
                  loading 
                    ? "bg-indigo-400 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                }`}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button 
              onClick={() => navigate("/login")}
              className="w-full text-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}