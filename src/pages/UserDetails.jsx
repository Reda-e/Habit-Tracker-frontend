import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from "../api/axios";

export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // كنعيطو للـ API لي كيجيب التفاصيل
        api.get(`/admin/users/${id}/details`).then(res => setUser(res.data));
    }, [id]);

    if (!user) return <div className="p-10 text-center">Chargement...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link to="/admin" className="text-blue-600 font-bold mb-6 block">← Retour au Panel</Link>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h1 className="text-3xl font-black text-gray-800">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">Habitudes de {user.name}</h2>
            
            {user.habits.length === 0 ? (
                <p className="text-gray-400">Aucune habitude enregistrée.</p>
            ) : (
                <div className="space-y-6">
                    {user.habits.map(habit => (
                        <div key={habit.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-blue-600">{habit.titre}</h3>
                            <p className="text-gray-600 mt-1 mb-4">{habit.description}</p>
                            
                            <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-2">Historique (Logs):</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {habit.logs.map(log => (
                                    <div key={log.id} className="bg-gray-50 p-3 rounded-lg text-sm text-center border border-gray-100">
                                        <span className="block font-bold text-gray-700">{log.date}</span>
                                        <span className="text-xs text-gray-500">{log.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}