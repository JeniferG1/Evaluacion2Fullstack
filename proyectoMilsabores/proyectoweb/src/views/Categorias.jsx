import React from 'react';
// Importamos tu arreglo desde la carpeta data
import { productosIniciales } from '../data/productos';

export default function Categorias() {
  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Catálogo de Productos</h2>
      
      {/* Contenedor en cuadrícula para las tarjetas */}
      <div className="productos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {productosIniciales.map((producto) => (
          <div key={producto.codigo} className="card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#fff' }}>
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }}
              // Por si falla una URL de internet, evita que rompa la UI
              onError={(e) => { e.target.src = 'https://via.placeholder.com/250'; }}
            />
            <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', display: 'block', marginTop: '10px' }}>
              {producto.categoria} ({producto.tamano})
            </span>
            <h3 style={{ fontSize: '18px', margin: '8px 0' }}>{producto.nombre}</h3>
            <p style={{ fontSize: '14px', color: '#444' }}>{producto.descripcion}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#2b7a78' }}>
                ${producto.precio.toLocaleString('es-CL')}
              </span>
              <button style={{ backgroundColor: '#3aafa9', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Añadir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}