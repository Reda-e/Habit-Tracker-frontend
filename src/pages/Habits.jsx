import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    frequency: "",
    start_date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch habits for logged-in user
  const fetchHabits = async () => {
    try {
      const res = await api.get("/habits");
      setHabits(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Error fetching habits");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHabits();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update habit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/habits/${editingId}`, form);
        setMessage("Habit updated successfully!");
      } else {
        await api.post("/habits", form);
        setMessage("Habit created successfully!");
      }
      setForm({ title: "", description: "", frequency: "", start_date: "" });
      setEditingId(null);
      fetchHabits();
    } catch (err) {
      console.log(err);
      setMessage("Error saving habit");
    }
  };

  // Edit habit
  const handleEdit = (habit) => {
    setForm({
      title: habit.title,
      description: habit.description,
      frequency: habit.frequency,
      start_date: habit.start_date.slice(0, 10),
    });
    setEditingId(habit.id);
  };

  // Delete habit
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this habit?")) return;
    try {
      await api.delete(`/habits/${id}`);
      setMessage("Habit deleted successfully!");
      fetchHabits();
    } catch (err) {
      console.log(err);
      setMessage("Error deleting habit");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Habits</h1>

      {message && <p className="mb-4 text-green-500">{message}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="frequency"
            placeholder="Frequency"
            value={form.frequency}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 mt-4 rounded w-full">
          {editingId ? "Update Habit" : "Add Habit"}
        </button>
      </form>

      {/* Habit List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg">{habit.title}</h2>
              <p className="text-sm text-gray-600">{habit.description}</p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Frequency:</span> {habit.frequency}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Start Date:</span> {habit.start_date.slice(0,10)}
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(habit)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(habit.id)}
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