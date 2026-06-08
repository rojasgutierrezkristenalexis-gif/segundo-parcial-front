import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importamos Link
import { AuthContext } from '../context/AuthContext';


export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // --- AQUÍ ESTÁ EL CAMBIO ---
        // 1. Guardamos el objeto completo (que contiene al usuario) en 'state'
        localStorage.setItem('state', JSON.stringify({ user: data.user }));
        
        // 2. Llamamos al contexto para mantener la app sincronizada
        login(data.user);
        
        navigate('/perfil'); // Redirigimos a perfil, no a registro
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Título principal */}
      <div className="mb-8 text-left w-full max-w-sm">
        <h1 className="text-3xl font-extrabold text-slate-900">¡BIENVENIDO!</h1>
        <p className="text-slate-600">Gestión Académica y Control de Calificaciones CUP.</p>
      </div>

      {/* Tarjeta de Login */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-200">
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* El error aparecerá aquí arriba, justo debajo del formulario */}
          {error && (
            <div className="text-red-600 text-xs font-bold bg-red-50 p-2 rounded text-center border border-red-200">
              {error}
            </div>
          )}

          {/* Campo Correo */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Correo electrónico
            </label>
            <input 
              name="email" 
              type="email" 
              placeholder="administrador@uagrm.edu.bo" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" 
              onChange={handleInputChange} 
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contraseña</label>
            <div className="relative">
              <input name="password" type="password" placeholder="••••••••" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" onChange={handleInputChange} />
              {/* Aquí iría el ícono del ojo */}
            </div>
          </div>

          {/* Opciones extra */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-slate-600">
              <input type="checkbox" className="mr-2" /> Recordar sesión
            </label>
            <Link to="/recuperar" className="text-blue-900 font-medium hover:underline">¿Problemas de acceso?</Link>
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition">
            INICIAR SESIÓN
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-8 text-gray-500 text-sm">
        © 2026 Soporte Técnico - Unidad de Tecnología FICCT
      </div>
    </div>
  );
}