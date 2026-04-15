import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/Login";
import Habits from "./pages/Habits";
import HabitLogs from "./pages/HabitLogs";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";

import Header from "./components/Header";
import Footer from "./components/Footer"; // Importation du Footer
import GuestRoute from "./GuestRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Conteneur principal en Flexbox 
            min-h-screen : occupe toute la hauteur de l'écran
            flex-col : organise les enfants verticalement
        */}
        <div className="flex flex-col min-h-screen bg-gray-50">
          
          <Header />

          {/* flex-grow : permet à cette partie de prendre tout l'espace disponible 
              Cela pousse le footer vers le bas automatiquement
          */}
          <main className="flex-grow p-4">
            <Routes>
              {/* Routes pour les invités (Non connectés) */}
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              {/* Routes protégées (Utilisateurs connectés) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Habits />} />
                <Route path="/logs" element={<HabitLogs />} />
                <Route path="/notifications" element={<Notifications />} />
              </Route>
            </Routes>
          </main>

          {/* Le Footer sera toujours en bas grâce au flex-grow du main */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}