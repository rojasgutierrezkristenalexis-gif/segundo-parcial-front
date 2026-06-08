import { useNavigate } from 'react-router-dom'; // <--- ESTA LÍNEA ES LA QUE FALTA
import { useEffect } from 'react';

const Perfil = () => {
    // Intentamos obtener 'user' primero, si no, 'state'
    const datosRaw = localStorage.getItem('user') || localStorage.getItem('state');
    
    // Convertimos de string a objeto
    const datos = datosRaw ? JSON.parse(datosRaw) : null;

    // Si no hay datos, redirigimos
    const navigate = useNavigate();
    useEffect(() => {
        if (!datos) {
            navigate('/registro');
        }
    }, [datos, navigate]);

    // Si los datos están dentro de una propiedad 'user' (común en algunas estructuras), 
    // ajustamos la referencia
    const usuario = datos?.user || datos; 

    if (!usuario) return <p>Cargando...</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Bienvenido, {usuario.email || "Usuario"}</h1>
            
            {/* AGREGA ESTO PARA DEPURAR */}
            <div className="mt-4 p-4 bg-gray-100 rounded">
                <p><strong>Datos crudos del usuario:</strong></p>
                <pre>{JSON.stringify(usuario, null, 2)}</pre>
            </div>
            
            {/* Tu botón de gestión corregido */}
            {usuario.role === 'admin' && (
                <button 
                    onClick={() => navigate('/roles')}
                    className="mt-6 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                    Ir a Gestión de Roles
                </button>
            )}
        </div>
    );
};

export default Perfil;