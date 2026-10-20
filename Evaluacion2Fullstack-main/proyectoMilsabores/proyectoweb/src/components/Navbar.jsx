// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Logo o Nombre de la marca */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
          <i className="bi bi-cake2-fill me-2"></i>Mil Sabores
        </Link>

        {/* Botón responsive para móviles */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Panel Admin</Link>
            </li>
            
            {/* Icono del Carrito de Compras */}
            <li className="nav-item ms-lg-3">
              <Link className="btn btn-outline-warning position-relative" to="/carrito">
                <i className="bi bi-cart3"></i> Carrito
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;