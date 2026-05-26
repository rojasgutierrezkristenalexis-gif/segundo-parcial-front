import React, { useState } from 'react';
import { API_URL } from '../constants';

export default function PagoRegistro() {
    const [formData, setFormData] = useState({
        ci: '',
        nro_transaccion: '',
        monto: ''
    });
    const [mensaje, setMensaje] = useState({ texto: '', esExitoso: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje({ texto: '', esExitoso: false });

        try {
            // Paso 1: Ir a buscar al postulante por su CI para obtener su ID real (CU14)
            const searchResponse = await fetch(`${API_URL}/postulantes/${formData.ci}`);
            const searchRes = await searchResponse.json();

            if (!searchRes.success) {
                setMensaje({ texto: 'El postulante con ese CI no existe en el sistema.', esExitoso: false });
                return;
            }

            const postulanteId = searchRes.data.id;

            // Paso 2: Con el ID en la mano, disparamos el registro del pago (CU10)
            const response = await fetch(`${API_URL}/pagos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postulante_id: postulanteId, // <--- Aquí le mandamos el entero que espera tu Laravel
                    monto: formData.monto,
                    nro_transaccion: formData.nro_transaccion
                })
            });

            const res = await response.json();

            if (res.success) {
                setMensaje({ texto: '¡Pago registrado y validado en PostgreSQL con éxito!', esExitoso: true });
                setFormData({ ci: '', nro_transaccion: '', monto: '' });
            } else {
                setMensaje({ texto: res.message, esExitoso: false });
            }
        } catch (error) {
            setMensaje({ texto: 'Error de conexión con el servidor', esExitoso: false });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registrar Pago CUP</h2>
                
                {mensaje.texto && (
                    <div className={`p-3 rounded-lg mb-4 text-center text-sm font-bold ${mensaje.esExitoso ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {mensaje.texto}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">CI del Postulante</label>
                        <input 
                            required
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Ej. 1234567"
                            value={formData.ci}
                            onChange={(e) => setFormData({...formData, ci: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nro. de Transacción</label>
                        <input 
                            required
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Ej. TXN-774411"
                            value={formData.nro_transaccion}
                            onChange={(e) => setFormData({...formData, nro_transaccion: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Monto (Bs.)</label>
                        <input 
                            required
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Ej. 350"
                            value={formData.monto}
                            onChange={(e) => setFormData({...formData, monto: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md mt-4"
                    >
                        Confirmar Pago
                    </button>
                </div>
            </form>
        </div>
    );
}