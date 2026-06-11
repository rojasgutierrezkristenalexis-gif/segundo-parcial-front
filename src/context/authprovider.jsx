import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restaurar sesión al cargar la página
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // En algunos entornos locales Sanctum requiere csrf-cookie
        try {
            await api.get('/sanctum/csrf-cookie');
        } catch (error) {
            console.log('Sanctum csrf-cookie no requerido o no configurado en este endpoint. Continuando.');
        }

        const { data } = await api.post('/login', { email, password });
        
        if (data.access_token && data.user) {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return data.user;
        } else {
            throw new Error('Formato de respuesta inválido');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    const hasPrivilege = (privilegioNombre) => {
        if (!user || !user.privilegios) return false;
        return user.privilegios.includes(privilegioNombre);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, hasPrivilege }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};