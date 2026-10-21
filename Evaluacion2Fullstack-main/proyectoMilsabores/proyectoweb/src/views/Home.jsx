import React from 'react';
import { obtenerProductos } from '../data/productos';

const Home = () => {
  const productos = obtenerProductos();

  return (
    <div className="container mt-4">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-dark">Bienvenido a Mil Sabores 🎂</h1>
          <p className="col-md-8 fs-4 text-muted">
            Descubre nuestra variedad de tortas, pasteles y productos artesanales hechos con el mejor amor y calidad.
          </p>
        </div>
      </div>

      <h2 className="mb-3">Nuestros Productos Destacados</h2>
      <div className="row">
        {productos.map(prod => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <div className="card h-shadow-sm h-100">
              <img src={prod.imagen} className="card-img-top" alt={prod.nombre} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text text-muted">{prod.descripcion}</p>
                <div className="mt-auto">
                  <span className="fw-bold fs-5 text-success">${prod.precio.toLocaleString('es-CL')}</span>
                  <button className="btn btn-warning w-100 mt-2">Agregar al Carrito</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;