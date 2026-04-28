import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Erreur lors du chargement", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // دالة موحدة لتحديث الـ UI بعد أي تغيير
  const refreshUI = () => {
    window.location.reload(); // الطريقة الأضمن باش يتحدث الرقم في الـ Header
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`, { read: true });
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
      refreshUI(); // تحديث الـ Header
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.post("/notifications/mark-all-read");
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setMessage({ text: "Toutes les notifications sont lues", type: "success" });
      setTimeout(() => setMessage(""), 3000);
      refreshUI(); // تحديث الـ Header
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id) => {
    if (!confirm("Supprimer cette notification ?")) return;
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notifications</h1>
          <p className="text-gray-500 font-medium">Restez informé de vos progrès.</p>
        </div>
        
        {notifications.some(n => !n.read) && (
          <button 
            onClick={markAllAsRead}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-all"
          >
            Tout marquer comme lu
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-2xl border text-sm font-bold flex items-center gap-2 ${
          message.type === "error" ? "bg-red-50 border-red-100 text-red-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
        }`}>
          <span>{message.type === "error" ? "⚠️" : "✨"}</span>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div 
              key={n.id}
              className={`relative group p-5 rounded-[2rem] border transition-all duration-300 ${
                n.read ? "bg-white border-gray-100 opacity-75" : "bg-white border-blue-100 shadow-md ring-1 ring-blue-50"
              }`}
            >
              <div className="flex gap-4">
                {!n.read && <span className="absolute top-6 left-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-lg ${n.read ? "text-gray-700" : "text-gray-900"}`}>{n.title}</h3>
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      {new Date(n.send_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${n.read ? "text-gray-500" : "text-gray-600 font-medium"}`}>
                    {n.message}
                  </p>
                  <div className="flex items-center gap-3">
                    {n.habit && (
                      <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">🎯 {n.habit.title}</span>
                    )}
                    <div className="ml-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.read && (
                        <button onClick={() => markAsRead(n.id)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg" title="Marquer comme lu">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </button>
                      )}
                      <button onClick={() => deleteNotification(n.id)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg" title="Supprimer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-100/50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="text-4xl mb-4">🔔</div>
            <p className="text-gray-400 font-medium italic">Aucune notification pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}