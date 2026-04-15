import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        
        {/* Logo / Title */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-blue-200 shadow-lg group-hover:rotate-12 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-black text-gray-800 tracking-tight">
            Habit<span className="text-blue-600">Tracker</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center font-semibold text-sm">
          <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">Habits</Link>
          <Link to="/logs" className="text-gray-500 hover:text-blue-600 transition-colors">Logs</Link>
          <Link to="/notifications" className="text-gray-500 hover:text-blue-600 transition-colors relative">
            Notifications
            <span className="absolute -top-1.5 -right-3 bg-red-500 text-[10px] text-white font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
              3
            </span>
          </Link>

          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-medium">Hi, {user.name?.split(' ')[0]} 👋</span>
              <button
                onClick={logout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-all font-bold text-xs border border-red-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl transition-all">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-50 p-4 space-y-3 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <Link to="/" className="block p-3 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all" onClick={()=>setMenuOpen(false)}>Habits</Link>
          <Link to="/logs" className="block p-3 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all" onClick={()=>setMenuOpen(false)}>Logs</Link>
          <Link to="/notifications" className="block p-3 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all relative" onClick={()=>setMenuOpen(false)}>
            Notifications
            <span className="ml-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">3 New</span>
          </Link>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full bg-red-50 text-red-600 p-3 rounded-xl font-bold transition-all border border-red-100 text-center"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="w-full text-center p-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all" onClick={()=>setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-blue-100 text-center" onClick={()=>setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}