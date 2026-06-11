import { useState } from 'react';
import { login } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('¡Login exitoso!');
    } catch (error) {
      alert('Error en las credenciales');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  );
}