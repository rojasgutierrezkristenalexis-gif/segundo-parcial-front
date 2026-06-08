import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="w-64 bg-indigo-800 text-white p-6">
      <h2 className="text-xl font-bold mb-8">Sistema CUP</h2>
      <ul className="space-y-4">
        <li><Link to="/registro" className="block hover:text-indigo-200">Registrar</Link></li>
        <li><Link to="/gestion" className="block hover:text-indigo-200">Gestión</Link></li>
        <li><Link to="/pagos" className="block hover:text-indigo-200">Registrar Pago</Link></li>
        <li><Link to="/roles" className="block hover:text-indigo-200">Gestión de Roles</Link></li>
        <li><Link to="/privilegios" className="block hover:text-indigo-200">Asignar Privilegios</Link></li>
      </ul>
    </nav>
  );
}