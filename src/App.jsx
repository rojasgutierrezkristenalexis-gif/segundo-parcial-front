import React, { useState } from 'react';
import PostulanteForm from './pages/PostulanteForm';
import PostulanteGestion from './pages/PostulanteGestion';
import PagoRegistro from './pages/PagoRegistro';

function App() {
  // Estado para saber qué pestaña mostrar
  const [tab, setTab] = useState('registro');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar con las 3 opciones */}
      <nav className="bg-indigo-700 p-4 shadow-md">
        <div className="container mx-auto flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => setTab('registro')}
            className={`text-white font-bold px-4 py-2 rounded-lg transition-all ${tab === 'registro' ? 'bg-indigo-900 shadow-inner' : 'hover:bg-indigo-600'}`}
          >
            CU11: Registrar
          </button>
          <button 
            onClick={() => setTab('gestion')}
            className={`text-white font-bold px-4 py-2 rounded-lg transition-all ${tab === 'gestion' ? 'bg-indigo-900 shadow-inner' : 'hover:bg-indigo-600'}`}
          >
            CU12-14: Gestión
          </button>
          <button 
            onClick={() => setTab('pago')}
            className={`text-white font-bold px-4 py-2 rounded-lg transition-all ${tab === 'pago' ? 'bg-green-800 shadow-inner' : 'hover:bg-green-600'}`}
          >
            CU10: Registrar Pago
          </button>
        </div>
      </nav>

      {/* Contenido dinámico */}
      <div className="container mx-auto px-4 py-10">
        {tab === 'registro' && <PostulanteForm />}
        {tab === 'gestion' && <PostulanteGestion />}
        {tab === 'pago' && <PagoRegistro />}
      </div>
    </div>
  );
}

export default App;