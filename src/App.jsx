import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authprovider';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostulanteGestion from './pages/Postulantegestion';
import PostulanteForm from './pages/PostulanteForm';
import PagoRegistro from './pages/PagoRegistro';
import GestionRoles from './pages/GestionRoles';
import GestionPrivilegios from './pages/GestionPrivilegios';

// Componente para proteger rutas de accesos no autenticados
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

// Componente para restringir vistas basadas en privilegios
function PrivilegeProtectedRoute({ privilege, children }) {
    const userString = localStorage.getItem('user');
    if (!userString) {
        return <Navigate to="/login" replace />;
    }
    
    try {
        const user = JSON.parse(userString);
        const hasPrivilege = user?.privilegios?.includes(privilege);
        if (!hasPrivilege) {
            return <Navigate to="/dashboard" replace />;
        }
    } catch (e) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Ruta de Login */}
                    <Route path="/login" element={<Login />} />

                    {/* Rutas Privadas envueltas en el Layout */}
                    <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        
                        <Route path="/postulantes" element={
                            <PrivilegeProtectedRoute privilege="registrar_postulantes">
                                <div className="space-y-8 max-w-4xl mx-auto">
                                    <PostulanteForm />
                                    <PostulanteGestion />
                                </div>
                            </PrivilegeProtectedRoute>
                        } />
                        
                        <Route path="/pagos" element={
                            <PrivilegeProtectedRoute privilege="registrar_pagos">
                                <PagoRegistro />
                            </PrivilegeProtectedRoute>
                        } />

                        <Route path="/roles" element={
                            <PrivilegeProtectedRoute privilege="gestionar_usuarios">
                                <GestionRoles />
                            </PrivilegeProtectedRoute>
                        } />

                        <Route path="/privilegios" element={
                            <PrivilegeProtectedRoute privilege="gestionar_usuarios">
                                <GestionPrivilegios />
                            </PrivilegeProtectedRoute>
                        } />
                    </Route>

                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}