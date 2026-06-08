import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Esto sí es correcto si Sidebar está en la misma carpeta

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};