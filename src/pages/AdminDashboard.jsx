import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../api/axios";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/users')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-20 text-center text-xl font-bold">Chargement en cours...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Admin Panel - Gestion des utilisateurs</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Nom</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="p-4">{user.id}</td>
                                <td className="p-4 text-blue-600 font-semibold hover:underline">
                                    <Link to={`/admin/users/${user.id}/details`}>{user.name}</Link>
                                </td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    <button 
                                        onClick={() => {
                                            if(window.confirm("Supprimer cet utilisateur ?")) {
                                                api.delete(`/admin/users/${user.id}`).then(() => {
                                                    setUsers(users.filter(u => u.id !== user.id));
                                                });
                                            }
                                        }}
                                        className="text-red-500 font-bold"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}