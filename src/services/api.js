import axios from 'axios';

// Aquí configurarás la IP o URL de tu backend Laravel
const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Esto es vital para manejar sesiones con Laravel Sanctum
});

export default api;