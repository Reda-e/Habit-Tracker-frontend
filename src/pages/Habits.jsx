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
  const [loading, setLoading] = useState(false);

  // Charger les habitudes depuis l'API
  const fetchHabits = async () => {
    try {
      const res = await api.get("/habits");
      setHabits(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      showStatus("Erreur lors du chargement des données", "error");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Utilitaire pour afficher les messages flash
  const showStatus = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 4000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Créer ou Modifier une habitude
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        // Mode Mise à jour (Update)
        await api.put(`/habits/${editingId}`, form);
        showStatus("Habitude mise à jour avec succès !");
      } else {
        // Mode Création (Store)
        await api.post("/habits", form);
        showStatus("Nouvelle habitude ajoutée !");
      }
      resetForm();
      fetchHabits();
    } catch (err) {
      console.error("Submit error:", err);
      showStatus("Erreur lors de l'enregistrement", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", frequency: "", start_date: "" });
    setEditingId(null);
  };

  // Préparer le formulaire pour la modification
  const handleEdit = (habit) => {
    setForm({
      title: habit.title,
      description: habit.description || "",
      frequency: habit.frequency,
      start_date: habit.start_date ? habit.start_date.slice(0, 10) : "",
    });
    setEditingId(habit.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Supprimer une habitude
  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cette habitude ?")) return;
    try {
      await api.delete(`/habits/${id}`);
      showStatus("Habitude supprimée !");
      // Mise à jour immédiate de la liste côté client
      setHabits(habits.filter(h => h.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      showStatus("Erreur lors de la suppression", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Mes Habitudes</h1>
            <p className="text-gray-500 mt-1 font-medium">Construisez votre routine, changez votre vie.</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
            <span className="text-blue-600 font-bold">{habits.length}</span>
          </div>
        </div>

        {/* Alerts */}
        {message && (
          <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 animate-fade-in ${
            message.type === "error" ? "bg-red-50 border-red-100 text-red-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
          }`}>
            <span>{message.type === "error" ? "⚠️" : "✨"}</span>
            <span className="font-bold">{message.text}</span>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50 mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className={`w-2 h-6 rounded-full ${editingId ? 'bg-amber-400' : 'bg-blue-500'}`}></span>
            {editingId ? "Modifier l'habitude" : "Créer une nouvelle habitude"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Titre</label>
              <input name="title" type="text" value={form.title} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Fréquence</label>
              <input name="frequency" type="text" placeholder="ex: Quotidien" value={form.frequency} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Date de début</label>
              <input name="start_date" type="date" value={form.start_date} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Description</label>
              <input name="description" type="text" value={form.description} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button type="submit" disabled={loading} className={`flex-1 py-4 rounded-2xl font-bold text-white transition-all transform active:scale-[0.98] ${editingId ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-100'}`}>
              {loading ? "Chargement..." : editingId ? "Enregistrer les modifications" : "Commencer cette habitude"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                Annuler
              </button>
            )}
          </div>
        </form>

        {/* List Section */}
        <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
          Votre Parcours <span className="h-px bg-gray-200 flex-1"></span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habits.map((habit) => (
            <div key={habit.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-black text-xl text-gray-800">{habit.title}</h2>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-2 py-1 rounded-lg">
                  {habit.frequency}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-6 h-10 line-clamp-2">{habit.description || "Aucune description."}</p>
              
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-300">Depuis</p>
                  <p className="text-xs font-bold text-gray-600">{habit.start_date.slice(0, 10)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(habit)} className="p-2 bg-gray-50 text-gray-400 hover:text-amber-500 rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(habit.id)} className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}