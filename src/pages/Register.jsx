// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  // Gestion des inputs
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.password_confirmation) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Appel à AuthContext register
    const res = await register(formData);

    if (res.success) {
      navigate("/"); // Rediriger vers Habits après inscription
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>
          Nom
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        </label>

        <label>
          Confirmer le mot de passe
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          S'inscrire
        </button>
      </form>

      <p className="mt-4 text-sm">
        Déjà un compte?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
}