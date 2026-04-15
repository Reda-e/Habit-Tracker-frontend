import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "../AuthContext";

export default function HabitLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [form, setForm] = useState({
    habit_id: "",
    date: new Date().toISOString().split('T')[0],
    status: "done",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [logsRes, habitsRes] = await Promise.all([
        api.get("/habit-logs"),
        api.get("/habits")
      ]);
      setLogs(logsRes.data);
      setHabits(habitsRes.data);
    } catch (err) {
      showMsg("Failed to load data ❌", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showMsg = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return showMsg("Please login first", "error");

    try {
      if (editingId) {
        await api.put(`/habit-logs/${editingId}`, form);
        showMsg("Log updated successfully ✅");
      } else {
        await api.post("/habit-logs", form);
        showMsg("Log added successfully ✅");
      }
      resetForm();
      fetchData();
    } catch (err) {
      showMsg(err.response?.data?.message || "Error saving log ❌", "error");
    }
  };

  const resetForm = () => {
    setForm({ habit_id: "", date: new Date().toISOString().split('T')[0], status: "done" });
    setEditingId(null);
  };

  const handleEdit = (log) => {
    setForm({
      habit_id: log.habit_id,
      date: log.date.slice(0, 10),
      status: log.status,
    });
    setEditingId(log.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this log?")) return;
    try {
      await api.delete(`/habit-logs/${id}`);
      showMsg("Deleted ✅");
      fetchData();
    } catch (err) {
      showMsg("Error deleting ❌", "error");
    }
  };

  // مساعد لاختيار لون الحالة
  const getStatusStyle = (status) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-700 border-green-200';
      case 'skipped': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Habit Tracker</h1>
            <p className="text-gray-500 mt-1">Keep track of your daily progress and consistency.</p>
          </div>
          {loading && (
            <div className="flex items-center text-blue-600 font-medium animate-pulse">
              <span className="mr-2">Updating...</span>
            </div>
          )}
        </div>

        {/* Floating Message */}
        {message.text && (
          <div className={`fixed top-5 right-5 z-50 p-4 rounded-xl shadow-2xl border text-white transition-all duration-500 transform translate-x-0 ${message.type === "error" ? "bg-red-500 border-red-600" : "bg-emerald-500 border-emerald-600"}`}>
            <div className="flex items-center gap-2">
              <span className="font-bold">{message.text}</span>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
            <div className={`h-2 w-full ${editingId ? 'bg-amber-400' : 'bg-blue-600'}`}></div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    {editingId ? "📝 Edit Your Progress" : "🚀 Log Today's Progress"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Habit</label>
                        <select
                            name="habit_id"
                            value={form.habit_id}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 transition-all outline-none"
                            required
                        >
                            <option value="">Choose a habit</option>
                            {habits.map((h) => (
                                <option key={h.id} value={h.id}>{h.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 transition-all outline-none"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 transition-all outline-none"
                            required
                        >
                            <option value="done">Completed ✅</option>
                            <option value="skipped">Skipped ⏭️</option>
                            <option value="failed">Failed ❌</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                    <button type="submit" className={`flex-1 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg transform active:scale-95 ${editingId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}>
                        {editingId ? "Save Changes" : "Confirm Log"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 px-6 rounded-xl transition-all">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>

        {/* History List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
            <span className="text-sm text-gray-500 font-medium">{logs.length} Entries</span>
          </div>

          {loading && logs.length === 0 ? (
            <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-500">Fetching logs...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {logs.map((log) => (
                <div key={log.id} className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${log.status === 'done' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                        {log.habit?.title?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{log.habit?.title || "Archived Habit"}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-gray-400">{new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="text-gray-300">•</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(log.status)}`}>
                          {log.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(log)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button onClick={() => handleDelete(log.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {logs.length === 0 && !loading && (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                  <div className="text-4xl mb-4">🍃</div>
                  <h3 className="text-gray-800 font-bold text-lg">No logs yet</h3>
                  <p className="text-gray-500">Choose a habit and mark your first achievement!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}