import React, { useState } from 'react';
import PostulanteForm from './pages/PostulanteForm';
import PostulanteGestion from './pages/PostulanteGestion';
import PagoRegistro from './pages/PagoRegistro';
import GestionRoles from './pages/GestionRoles';
import GestionPrivilegios from './pages/GestionPrivilegios';

function App() {
  // Estado para saber qué pestaña mostrar
  const [tab, setTab] = useState('registro');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar con las 5 opciones */}
      <nav className="bg-indigo-700 p-4 shadow-md">
        <div className="container mx-auto flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => setTab('registro')}
            className={`text-white font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${tab === 'registro' ? 'bg-indigo-950 shadow-inner border border-indigo-500' : 'hover:bg-indigo-650'}`}
          >
            CU11: Registrar
          </button>
          <button 
            onClick={() => setTab('gestion')}
            className={`text-white font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${tab === 'gestion' ? 'bg-indigo-950 shadow-inner border border-indigo-500' : 'hover:bg-indigo-650'}`}
          >
            CU12-14: Gestión
          </button>
          <button 
            onClick={() => setTab('pago')}
            className={`text-white font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${tab === 'pago' ? 'bg-indigo-950 shadow-inner border border-indigo-500' : 'hover:bg-indigo-650'}`}
          >
            CU10: Registrar Pago
          </button>
          <button 
            onClick={() => setTab('roles')}
            className={`text-white font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${tab === 'roles' ? 'bg-indigo-950 shadow-inner border border-indigo-500' : 'hover:bg-indigo-650'}`}
          >
            CU05: Gestión de Roles
          </button>
          <button 
            onClick={() => setTab('privilegios')}
            className={`text-white font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${tab === 'privilegios' ? 'bg-indigo-950 shadow-inner border border-indigo-500' : 'hover:bg-indigo-650'}`}
          >
            CU06: Asignar Privilegios
          </button>
        </div>
      </nav>

      {/* Contenido dinámico */}
      <div className="container mx-auto px-4 py-8">
        {tab === 'registro' && <PostulanteForm />}
        {tab === 'gestion' && <PostulanteGestion />}
        {tab === 'pago' && <PagoRegistro />}
        {tab === 'roles' && <GestionRoles />}
        {tab === 'privilegios' && <GestionPrivilegios />}
      </div>
    </div>
  );
}

export default App;