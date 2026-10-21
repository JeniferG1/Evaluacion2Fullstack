import React from 'react';
import { useCart } from '../context/CartContext';
import { SellosNutricionales } from '../components/SellosNutricionales';

export default function Home() {
  const { productos, agregarAlCarrito } = useCart();

  return (
    <div className="container-fluid px-0">
      {/* 1. HERO BANNER DE ALTO NIVEL */}
      <div 
        className="position-relative overflow-hidden text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(17, 17, 17, 0.65) 0%, rgba(17, 17, 17, 0.75) 100%), url('/img/portada4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '80vh',
          width: '100%'
        }}
      >
        <div className="container py-5 text-center position-relative" style={{ zIndex: 2 }}>
          <span className="text-uppercase tracking-widest fw-semibold text-warning mb-2 d-block" style={{ letterSpacing: '3px', fontSize: '0.9rem' }}>
            Tradición & Pasión Artesanal
          </span>
          <h1 className="display-2 fw-bold text-white mb-3">
            Pastelería Mil Sabores
          </h1>
          <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: '650px', fontSize: '1.25rem', opacity: 0.9 }}>
            50 años creando experiencias dulces e inolvidables con los más finos ingredientes para la familia chilena.
          </p>
          <a href="#catalogo" className="btn btn-warning btn-lg rounded-pill py-3 px-5 fw-bold shadow-sm">
            Explorar Catálogo 🎂
          </a>
        </div>
      </div>

      {/* 2. CARACTERÍSTICAS / BENEFICIOS */}
      <div className="container py-5 my-4">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center p-4 bg-white border-0 shadow-sm feature-card h-100">
              <div className="fs-1 me-3 p-3 rounded-circle" style={{ backgroundColor: '#fff8f0' }}>🌾</div>
              <div>
                <h5 className="mb-1 fw-bold">Ingredientes Frescos</h5>
                <p className="mb-0 text-muted small">Materia prima seleccionada diariamente para asegurar frescura pura.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center p-4 bg-white border-0 shadow-sm feature-card h-100">
              <div className="fs-1 me-3 p-3 rounded-circle" style={{ backgroundColor: '#fff8f0' }}>👨‍🍳</div>
              <div>
                <h5 className="mb-1 fw-bold">Receta Tradicional</h5>
                <p className="mb-0 text-muted small">Perfección artesanal transmitida de generación en generación.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center p-4 bg-white border-0 shadow-sm feature-card h-100">
              <div className="fs-1 me-3 p-3 rounded-circle" style={{ backgroundColor: '#fff8f0' }}>🚚</div>
              <div>
                <h5 className="mb-1 fw-bold">Despacho Especializado</h5>
                <p className="mb-0 text-muted small">Transporte refrigerado que mantiene la textura e integridad impecables.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GRILLA DE PRODUCTOS DESTACADOS */}
      <div className="container py-5" id="catalogo">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
          <span className="text-warning text-uppercase fw-bold tracking-wider" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>
            Nuestra Selección
          </span>
          <h2 className="display-5 fw-bold mt-1 mb-3">Catálogo Destacado</h2>
          <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#e6a15c' }}></div>
        </div>

        <div className="row g-4">
          {productos.map((prod) => (
            <div className="col-lg-4 col-md-6" key={prod.id}>
              <div className="card product-item bg-white border-0 shadow-sm h-100 overflow-hidden">
                <div className="position-relative overflow-hidden" style={{ height: '260px' }}>
                  <img 
                    className="w-100 h-100" 
                    style={{ objectFit: 'cover' }} 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400?text=Mil+Sabores';
                    }}
                  />
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
                      className="btn btn-warning rounded-pill py-2.5 px-4 w-100 fw-bold shadow-sm"
                      onClick={() => agregarAlCarrito(prod)}
                    >
                      Añadir al Carrito 🛒
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 