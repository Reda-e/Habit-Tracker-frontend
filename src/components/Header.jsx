import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Habits</Link>
        <Link to="/logs">Logs</Link>
        <Link to="/notifications">Notifications</Link>
      </div>
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}