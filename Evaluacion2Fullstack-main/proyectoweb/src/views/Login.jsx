import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

  
    const resultado = login(email, password);

    if (!resultado.success) {
      setError(resultado.message);
      return;
    }

    alert('¡Inicio de sesión exitoso!');
    navigate('/');
  };

  return (
    <div className="row justify-content-center py-5">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow border-0 p-4 bg-white rounded">
          <h2 className="text-center mb-4" style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>
            Iniciar Sesión
          </h2>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
              <div className="mt-2">
                <Link to="/registro" className="btn btn-sm btn-outline-dark fw-bold w-100">
                  Ir a Registrarse 📝
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="tu.correo@duocuc.cl" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn w-100 text-white py-2 fw-bold" style={{ backgroundColor: '#8B4513' }}>
              Entrar
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              ¿No tienes una cuenta? <Link to="/registro" style={{ color: '#8B4513' }}>Regístrate primero</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;