import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { usuarioLogueado, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
      <div className="container">
        <Link className="navbar-brand fs-3" to="/" style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>
           Pastelería Mil Sabores
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-bold px-3" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold px-3" to="/categorias">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold px-3" to="/carrito">🛒 Carrito</Link>
            </li>
            {usuarioLogueado ? (
              <li className="nav-item ms-3">
                <span className="me-2 text-muted">Hola, {usuarioLogueado.nombre}</span>
                <button className="btn btn-sm btn-outline-danger" onClick={logout}>Cerrar Sesión</button>
              </li>
            ) : (
              <li className="nav-item ms-3">
                <Link className="btn text-white px-3 py-2" to="/login" style={{ backgroundColor: '#8B4513' }}>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;