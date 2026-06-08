import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

export default function GestionRoles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRol, setEditingRol] = useState(null);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
    const navigate = useNavigate();

    // Protección: Solo administradores pueden ver esto
    useEffect(() => {
        const userRaw = localStorage.getItem('user') || localStorage.getItem('state');
        const userData = userRaw ? JSON.parse(userRaw) : null;
        const usuario = userData?.user || userData;

        if (!usuario || (usuario.rol !== 'Admin')) {
            navigate('/perfil');
        }
    }, [navigate]);

    const mostrarMensaje = useCallback((texto, tipo) => {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje({ texto: '', tipo: '' }), 5000);
    }, []);

    const obtenerRoles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/roles`);
            const res = await response.json();
            if (res.success) {
                setRoles(res.data);
            } else {
                mostrarMensaje(res.message || 'Error al cargar roles', 'error');
            }
        } catch (error) {
            mostrarMensaje('Error de conexión con el backend', 'error');
        } finally {
            setLoading(false);
        }
    }, [mostrarMensaje]);

    useEffect(() => {
        let isMounted = true; // Variable para evitar actualizar si el componente se desmonta

        const fetchData = async () => {
            if (isMounted) {
                await obtenerRoles();
            }
        };

        fetchData();

        return () => { isMounted = false; }; // Limpieza
    }, [obtenerRoles]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editingRol ? `${API_URL}/roles/${editingRol.id}` : `${API_URL}/roles`;
        const method = editingRol ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const res = await response.json();

            if (res.success) {
                mostrarMensaje(res.message || 'Operación exitosa', 'exito');
                setModalOpen(false);
                obtenerRoles();
            } else {
                mostrarMensaje(res.message || 'Error al procesar el rol', 'error');
            }
        } catch (error) {
            mostrarMensaje('Error al conectar con el servidor', 'error');
        } finally {
            setLoading(false);
        }
    };

    const eliminarRol = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este rol?')) return;
        try {
            const response = await fetch(`${API_URL}/roles/${id}`, { method: 'DELETE' });
            const res = await response.json();
            if (res.success) {
                mostrarMensaje('Rol eliminado con éxito', 'exito');
                obtenerRoles();
            } else {
                mostrarMensaje(res.message, 'error');
            }
        } catch (error) {
            mostrarMensaje('Error al eliminar', 'error');
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-6 p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Gestión de Roles</h1>
                    <p className="text-gray-500">Administra los niveles de acceso del sistema.</p>
                </div>
                <button 
                    onClick={() => { setEditingRol(null); setFormData({ nombre: '', descripcion: '' }); setModalOpen(true); }}
                    className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-indigo-700"
                >
                    + Nuevo Rol
                </button>
            </div>

            {mensaje.texto && (
                <div className={`p-4 mb-4 rounded-lg ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {mensaje.texto}
                </div>
            )}

            <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase">Descripción</th>
                            <th className="px-6 py-3 text-right text-xs font-bold uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {roles.map(rol => (
                            <tr key={rol.id}>
                                <td className="px-6 py-4 font-bold">{rol.nombre}</td>
                                <td className="px-6 py-4 text-gray-600">{rol.descripcion}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => { setEditingRol(rol); setFormData({ nombre: rol.nombre, descripcion: rol.descripcion }); setModalOpen(true); }} className="text-blue-600 mr-4">Editar</button>
                                    <button onClick={() => eliminarRol(rol.id)} className="text-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4">{editingRol ? 'Editar Rol' : 'Nuevo Rol'}</h2>
                        <input className="w-full p-2 border rounded mb-3" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
                        <textarea className="w-full p-2 border rounded mb-4" placeholder="Descripción" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Guardar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}