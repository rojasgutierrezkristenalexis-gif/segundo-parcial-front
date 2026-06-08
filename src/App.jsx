import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import Login from './pages/Login';
import PostulanteForm from './pages/PostulanteForm';
import PostulanteGestion from './pages/PostulanteGestion';
import PagoRegistro from './pages/PagoRegistro';
import GestionRoles from './pages/GestionRoles';
import GestionPrivilegios from './pages/GestionPrivilegios';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas privadas: MainLayout como padre */}
        <Route element={<MainLayout />}>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/registro" element={<PostulanteForm />} />
          <Route path="/gestion-postulantes" element={<PostulanteGestion />} />
          <Route path="/pagos" element={<PagoRegistro />} />
          <Route path="/roles" element={<GestionRoles />} />
          <Route path="/privilegios" element={<GestionPrivilegios />} />
          <Route path="*" element={<Navigate to="/registro" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;