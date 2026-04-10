import { useState, useEffect } from "react";
import api from "../api/axios";

export default function HabitLogs() {
  const [logs, setLogs] = useState([]);
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({
    habit_id: "",
    date: "",
    status: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch logs
  const fetchLogs = async () => {
    try {
      const res = await api.get("/habit-logs");
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch habits for select dropdown
  const fetchHabits = async () => {
    try {
      const res = await api.get("/habits");
      setHabits(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLogs();
    fetchHabits();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update log
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/habit-logs/${editingId}`, form);
        setMessage("Log updated successfully!");
      } else {
        await api.post("/habit-logs", { ...form, user_id: 1 }); // replace user_id dynamically
        setMessage("Log created successfully!");
      }
      setForm({ habit_id: "", date: "", status: "" });
      setEditingId(null);
      fetchLogs();
    } catch (err) {
      console.log(err);
      setMessage("Error saving log");
    }
  };

  // Edit log
  const handleEdit = (log) => {
    setForm({
      habit_id: log.habit_id,
      date: log.date.slice(0,10),
      status: log.status,
    });
    setEditingId(log.id);
  };

  // Delete log
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this log?")) return;
    try {
      await api.delete(`/habit-logs/${id}`);
      setMessage("Log deleted successfully!");
      fetchLogs();
    } catch (err) {
      console.log(err);
      setMessage("Error deleting log");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Habit Logs</h1>

      {message && <p className="mb-4 text-green-500">{message}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          name="habit_id"
          value={form.habit_id}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        >
          <option value="">Select Habit</option>
          {habits.map((h) => (
            <option key={h.id} value={h.id}>{h.title}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        >
          <option value="">Select Status</option>
          <option value="done">Done</option>
          <option value="skipped">Skipped</option>
          <option value="pending">Pending</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2 rounded col-span-1 md:col-span-3"
        >
          {editingId ? "Update Log" : "Add Log"}
        </button>
      </form>

      {/* List of logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
            <div>
              <h2 className="font-bold">{log.habit?.title || "Habit deleted"}</h2>
              <p>Date: {log.date.slice(0,10)}</p>
              <p>Status: <span className={log.status==="done"?"text-green-500": log.status==="skipped"?"text-red-500":"text-yellow-500"}>{log.status}</span></p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(log)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(log.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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