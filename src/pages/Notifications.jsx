import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
  }, []);

  // Delete notification
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;
    try {
      await api.delete(`/notifications/${id}`);
      setMessage("Notification deleted successfully!");
      fetchNotifications();
    } catch (err) {
      console.log(err);
      setMessage("Error deleting notification");
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await api.post("/notifications/mark-all-read");
      setMessage("All notifications marked as read!");
      fetchNotifications();
    } catch (err) {
      console.log(err);
      setMessage("Error marking notifications");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>

      {message && <p className="mb-4 text-green-500">{message}</p>}

      <div className="flex justify-end mb-4">
        <button
          onClick={handleMarkAllAsRead}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Mark all as read
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded shadow flex flex-col justify-between ${
              notif.read ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div>
              <h2 className="font-bold text-lg">{notif.title}</h2>
              {notif.habit && (
                <p className="text-sm text-gray-600">Habit: {notif.habit.title}</p>
              )}
              <p className="mt-1">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-2">Send at: {new Date(notif.send_at).toLocaleString()}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleDelete(notif.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}