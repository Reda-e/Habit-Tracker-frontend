# 🎨 Habit Tracker - Frontend (React + Vite)

Ce dépôt contient l'interface utilisateur (Client) de l'application **Habit Tracker**. Développée avec **React** et propulsée par **Vite**, cette application offre une expérience utilisateur fluide, dynamique et entièrement réactive (Responsive).

L'application communique directement avec l'API Laravel pour la gestion des habitudes, l'authentification et le suivi des performances.

---

## 🛠️ Technologies Utilisées

* **Framework UI :** React JS (Hooks, Context API)
* **Outil de Build :** Vite (HMR - Hot Module Replacement pour un développement rapide)
* **Style & Design :** Tailwind CSS / Bootstrap
* **Gestion des Requêtes :** Axios (avec configuration des Headers d'authentification)
* **Notifications UI :** React-Toastify (ou similaire pour les flash messages)

---

## 📦 Structure du Projet (Frontend)

```text
src/
├── assets/            # Images, logos et styles globaux
├── components/        # Composants réutilisables (Navbar, Sidebar, HabitCard)
├── context/           # Gestion globale de l'état (AuthContext pour le Token)
├── pages/             # Les pages principales (Login, Register, Dashboard, Logs, Admin)
├── services/          # Configuration d'Axios et appels API (api.js)
├── App.jsx            # Configuration des Routes (React Router)
└── main.jsx           # Point d'entrée de l'application
