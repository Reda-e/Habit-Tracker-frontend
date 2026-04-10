import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo / Title */}
        <div className="text-xl font-bold">Habit Tracker</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-200">Habits</Link>
          <Link to="/logs" className="hover:text-gray-200">Logs</Link>
          <Link to="/notifications" className="hover:text-gray-200 relative">
            Notifications
            {/* Badge example */}
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1 rounded-full">3</span>
          </Link>

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Login</Link>
              <Link to="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Register</Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-2 bg-blue-600 p-4">
          <Link to="/" className="hover:text-gray-200" onClick={()=>setMenuOpen(false)}>Habits</Link>
          <Link to="/logs" className="hover:text-gray-200" onClick={()=>setMenuOpen(false)}>Logs</Link>
          <Link to="/notifications" className="hover:text-gray-200 relative" onClick={()=>setMenuOpen(false)}>
            Notifications
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1 rounded-full">3</span>
          </Link>

          {user ? (
            <button
              onClick={() => { logout(); setMenuOpen(false); }}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600" onClick={()=>setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600" onClick={()=>setMenuOpen(false)}>Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}