import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/authprovider';

export default function Sidebar() {
    const { user, hasPrivilege } = useContext(AuthContext);

    return (
        <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen fixed left-0 top-0 shadow-xl border-r border-slate-800 z-30">
            {/* Cabecera Sidebar */}
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                </div>
                <div>
                    <h2 className="font-extrabold text-sm tracking-tight text-white">Preu FICCT</h2>
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Admisión CUP</span>
                </div>
            </div>

            {/* Links de navegación */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Menú Principal</p>

                {/* Dashboard (para todos) */}
                <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            isActive 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                        }`
                    }
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path>
                    </svg>
                    <span>Dashboard</span>
                </NavLink>

                {/* Registrar Postulante */}
                {hasPrivilege('registrar_postulantes') && (
                    <NavLink 
                        to="/postulantes" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                            }`
                        }
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                        <span>Gestionar Postulantes</span>
                    </NavLink>
                )}

                {/* Registrar Pagos */}
                {hasPrivilege('registrar_pagos') && (
                    <NavLink 
                        to="/pagos" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                            }`
                        }
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Registrar Pago</span>
                    </NavLink>
                )}

                {/* Separador de configuración */}
                {hasPrivilege('gestionar_usuarios') && (
                    <>
                        <div className="pt-4 border-t border-slate-800 my-4"></div>
                        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Seguridad y Roles</p>
                    </>
                )}

                {/* Gestionar Roles */}
                {hasPrivilege('gestionar_usuarios') && (
                    <NavLink 
                        to="/roles" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                            }`
                        }
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>Gestionar Roles</span>
                    </NavLink>
                )}

                {/* Asignar Privilegios */}
                {hasPrivilege('gestionar_usuarios') && (
                    <NavLink 
                        to="/privilegios" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                            }`
                        }
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                        </svg>
                        <span>Asignar Privilegios</span>
                    </NavLink>
                )}
            </nav>

            {/* Pie Sidebar - Info usuario */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-extrabold text-blue-400 text-sm">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h4 className="text-xs font-bold text-slate-200 truncate">{user?.name}</h4>
                        <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider block mt-0.5 truncate">{user?.rol}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
