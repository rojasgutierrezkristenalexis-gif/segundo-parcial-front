import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importamos el contexto

export default function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext); // Usamos el contexto en lugar de solo localStorage

    // Si no hay usuario en el contexto, redirige al login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Si hay usuario, deja pasar
    return children;
}