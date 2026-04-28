import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import axios from 'axios';
import { useAuth } from '../AuthContext';

export default function Profile() {
    const { logout } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [passwords, setPasswords] = useState({ new_password: '' });
    const [message, setMessage] = useState('');

   useEffect(() => {
        api.get('/profile')
            .then(res => setFormData(res.data.user))
            .catch(err => console.error("Error loading profile:", err));
    }, []);

    // 🔹 تحديث المعلومات
    const updateProfile = async (e) => {
        e.preventDefault();
        setMessage("En cours...");
        try {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });
            const res = await api.put('/profile', formData);
            setMessage(res.data.message);
        } catch (err) {
            const errorMsg = err.response?.data?.message || JSON.stringify(err.response?.data?.errors);
            setMessage("Erreur: " + errorMsg);
        }
    };

    // 🔹 تغيير الباسورد
   const changePassword = async (e) => {
    e.preventDefault();
    try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });
        const res = await api.post('/change-password', passwords);
        
        setMessage(res.data.message); // ميساج النجاح
        setPasswords({ current_password: '', new_password: '', new_password_confirmation: '' });
} catch (err) {
    // هاد السطر غيوريك فين كاين المشكل بالظبط في الـ Console
    console.error("تفاصيل الخطأ:", err.response ? err.response.data : err.message);
    
    // هاد الميساج غيبان ليك في الصفحة
    const message = err.response?.data?.message || "خطأ غير معروف في السيرفر";
    setMessage("Erreur: " + message);
}
};

    // 🔹 حذف الحساب
    const deleteAccount = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte définitivement ?")) {
            await api.delete('/profile');
            logout();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold">Mon Profil</h1>
            {message && <div className="bg-blue-100 text-blue-700 p-3 rounded text-sm">{message}</div>}

            {/* تعديل المعلومات */}
            <form onSubmit={updateProfile} className="bg-white p-6 rounded-lg shadow space-y-4">
                <h2 className="font-bold">Modifier les infos</h2>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded" />
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-2 rounded" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sauvegarder</button>
            </form>

            {/* تغيير الباسورد */}
            <form onSubmit={changePassword} className="bg-white p-6 rounded-lg shadow space-y-4">
                <h2 className="font-bold">Changer le mot de passe</h2>
                <input type="password" placeholder="Nouveau mot de passe" value={passwords.new_password} onChange={e => setPasswords({ new_password: e.target.value })} className="w-full border p-2 rounded" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Changer</button>
            </form>

            {/* حذف الحساب */}
            <button onClick={deleteAccount} className="text-red-600 font-bold border border-red-200 p-3 rounded w-full hover:bg-red-50">Supprimer le compte</button>
        </div>
    );
}