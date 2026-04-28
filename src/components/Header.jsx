import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import api from "../api/axios";

export default function Header() {
  const { user, logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    if (!user) return;
    try {
      const res = await api.get("/notifications/unread-count");
      setUnreadCount(res.data.count);
    } catch (err) {
      console.error("Error fetching unread count");
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 60000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-black text-gray-800">Habit<span className="text-blue-600">Tracker</span></Link>

        <nav className="hidden md:flex gap-6 items-center text-sm font-semibold">
          <Link to="/" className="text-gray-500 hover:text-blue-600">Habits</Link>
          <Link to="/logs" className="text-gray-500 hover:text-blue-600">Logs</Link>
          
          <Link to="/notifications" className="relative hover:text-indigo-600">
            Notifications
            {unreadCount > 0 && (
              <span className="absolute -top-3 -right-5 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </Link>
          
          {user && user.is_admin === 1 && (
            <Link to="/admin" className="text-red-600 font-bold">Admin Panel</Link>
          )}

          {user ? (
            <div className="flex items-center gap-6">
              {/* لمسة احترافية: أفاتار بسيط مع الترحيب */}
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 text-xs font-bold truncate max-w-[100px]">Hi, {user.name}</span>
              </div>
              
              <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-bold">Profile</Link>
              <button 
                onClick={logout} 
                className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold border border-red-100 transition-all hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-4 py-2 text-gray-600">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl">Get Started</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}