import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");

  // Récupérer tous les habits
  const fetchHabits = async () => {
    try {
      const res = await api.get("/habits");
      setHabits(res.data);
    } catch (err) {
      console.log("Error fetching habits:", err);
      setMessage("Erreur lors du chargement des habits");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHabits();
  }, []);

  // Créer un nouvel habit
  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await api.post("/habits", {
        user_id: 1, // ici tu mets l'ID du user connecté
        title,
        description,
        frequency,
        start_date: startDate,
      });
      setHabits([...habits, res.data]);
      setTitle("");
      setDescription("");
      setFrequency("");
      setStartDate("");
      setMessage("Habit créé avec succès !");
    } catch (err) {
      console.log("Error creating habit:", err);
      setMessage("Erreur lors de la création");
    }
  };

  // Supprimer un habit
  const handleDelete = async (id) => {
    try {
      await api.delete(`/habits/${id}`);
      setHabits(habits.filter((h) => h.id !== id));
      setMessage("Habit supprimé !");
    } catch (err) {
      console.log("Error deleting habit:", err);
      setMessage("Erreur lors de la suppression");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mes Habits</h1>

      {message && <p className="mb-4 text-green-500">{message}</p>}

      <form onSubmit={handleCreate} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border"
        />
        <input
          type="text"
          placeholder="Fréquence"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="p-2 border"
          required
        />
        <input
          type="date"
          placeholder="Date de début"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 mt-2">
          Ajouter Habit
        </button>
      </form>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="flex justify-between items-center border-b p-2">
            <div>
              <p className="font-bold">{habit.title}</p>
              <p className="text-sm">{habit.description}</p>
              <p className="text-xs">Fréquence: {habit.frequency}</p>
              <p className="text-xs">Start: {habit.start_date}</p>
            </div>
            <button
              onClick={() => handleDelete(habit.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}