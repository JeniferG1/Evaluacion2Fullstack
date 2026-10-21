import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SellosNutricionales } from '../components/SellosNutricionales';

export default function Categorias() {
  const { productos, agregarAlCarrito } = useCart();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados = productos.filter((prod) => {
    if (categoriaSeleccionada === 'todas') return true;
    return prod.categoria === categoriaSeleccionada;
  });

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Catálogo de Productos 🎂</h1>
        <p className="text-muted fs-5">
          Encuentra la torta o el postre perfecto para tu celebración.
        </p>
      </div>

      {/* Selector Desplegable de Categorías */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-sm border-0 p-3 bg-white rounded-3">
            <label htmlFor="filtroCategoria" className="form-label fw-bold text-dark mb-2">
              Seleccionar Categoría:
            </label>
            <select
              id="filtroCategoria"
              className="form-select border-warning shadow-sm"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              style={{ borderRadius: '10px' }}
            >
              <option value="todas">✨ Todas las categorías</option>
              <option value="tortas-cuadradas">🔲 Tortas Cuadradas</option>
              <option value="tortas-circulares">🔴 Tortas Circulares</option>
              <option value="postres-individuales">🧁 Postres Individuales</option>
              <option value="sin-azucar">🌿 Sin Azúcar</option>
              <option value="tradicional">🥐 Pastelería Tradicional</option>
              <option value="sin-gluten">🌾 Sin Gluten</option>
              <option value="vegana">🌱 Opciones Veganas</option>
              <option value="especiales">⭐ Especiales & Celebraciones</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grilla de Productos Filtrados */}
      <div className="row g-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => (
            <div className="col-lg-4 col-md-6" key={prod.id}>
              <div className="card product-item bg-white rounded-3 shadow-sm h-100 overflow-hidden border-0">
                <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                  <img 
                    className="w-100 h-100" 
                    style={{ objectFit: 'cover' }} 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400?text=Mil+Sabores';
                    }}
                  />
                  {prod.tamano && (
                    <span className="badge bg-dark position-absolute top-0 end-0 m-3 text-capitalize px-3 py-2">
                      {prod.tamano}
                    </span>
                  )}
                </div>
                <div className="text-center p-4 d-flex flex-column flex-grow-1">
                  <h5 className="mb-2 fw-bold">{prod.nombre}</h5>
                  <span className="fw-bold fs-4 mb-3" style={{ color: '#d48b44' }}>
                    ${Number(prod.precio).toLocaleString('es-CL')}
                  </span>
                  
                  <p className="text-muted small mb-3 flex-grow-1">{prod.descripcion}</p>

                  <div className="d-flex justify-content-center mb-3">
                    <SellosNutricionales nombreProducto={prod.nombre} />
                  </div>

                  <div className="mt-auto">
                    <button 
                      className="btn btn-warning rounded-pill py-2 px-4 w-100 fw-bold shadow-sm"
                      onClick={() => agregarAlCarrito(prod)}
                    >
                      Añadir al Carrito 🛒
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <h5 className="text-muted">No se encontraron productos en esta categoría.</h5>
          </div>
        )}
      </div>
    </div>
  );
}