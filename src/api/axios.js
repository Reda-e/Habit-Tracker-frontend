import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // غير حسب Laravel API ديالك
  headers: { "Content-Type": "application/json" },
   // Permet l'envoi automatique des cookies
  withCredentials: true,
  // Ajout automatiquement le token CSRF dans les requetes protegees
  withXSRFToken: true,
});

export default api;