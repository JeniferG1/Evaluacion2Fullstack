import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 

const Categorias = () => {
  const { agregarAlCarrito } = useCart(); 

  const [productos] = useState([
    { 
      id: 'TC001', 
      nombre: 'Torta Cuadrada de Chocolate', 
      precio: 45000, 
      categoria: 'Tortas Cuadradas', 
      descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.', 
      imagen: '/img/product_1.png' 
    },
    { 
      id: 'TC002', 
      nombre: 'Torta Cuadrada de Frutas', 
      precio: 50000, 
      categoria: 'Tortas Cuadradas', 
      descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.', 
      imagen: '/img/product_2.jfif' 
    },
    { 
      id: 'TT001', 
      nombre: 'Torta Circular de Vainilla', 
      precio: 40000, 
      categoria: 'Tortas Circulares', 
      descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.', 
      imagen: '/img/product_3.webp' 
    },
    { 
      id: 'TT002', 
      nombre: 'Torta Circular de Manjar', 
      precio: 42000, 
      categoria: 'Tortas Circulares', 
      descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.', 
      imagen: '/img/product_4.jpg' 
    },
    { 
      id: 'PI001', 
      nombre: 'Mousse de Chocolate', 
      precio: 5000, 
      categoria: 'Postres Individuales', 
      descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.', 
      imagen: '/img/product_5.jpg' 
    },
    { 
      id: 'PI002', 
      nombre: 'Tiramisú Clásico', 
      precio: 5500, 
      categoria: 'Postres Individuales', 
      descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.', 
      imagen: '/img/product_6.jpg' 
    },
    { 
      id: 'PSA001', 
      nombre: 'Torta Sin Azúcar de Naranja', 
      precio: 48000, 
      categoria: 'Productos Sin Azúcar', 
      descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.', 
      imagen: '/img/product_7.jpg' 
    },
    { 
      id: 'PSA002', 
      nombre: 'Cheesecake Sin Azúcar', 
      precio: 47000, 
      categoria: 'Productos Sin Azúcar', 
      descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.', 
      imagen: '/img/product_8.jpg' 
    },
    { 
      id: 'PT001', 
      nombre: 'Empanada de Manzana', 
      precio: 3000, 
      categoria: 'Pastelería Tradicional', 
      descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.', 
      imagen: '/img/product_9.jpg' 
    },
    { 
      id: 'PT002', 
      nombre: 'Tarta de Santiago', 
      precio: 6000, 
      categoria: 'Pastelería Tradicional', 
      descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.', 
      imagen: '/img/product_10.jpg' 
    },
    { 
      id: 'PG001', 
      nombre: 'Brownie Sin Gluten', 
      precio: 4000, 
      categoria: 'Productos Sin Gluten', 
      descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.', 
      imagen: '/img/product_11.jpg' 
    },
    { 
      id: 'PG002', 
      nombre: 'Pan Sin Gluten', 
      precio: 3500, 
      categoria: 'Productos Sin Gluten', 
      descripcion: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.', 
      imagen: '/img/product_12.jpg' 
    },
    { 
      id: 'PV001', 
      nombre: 'Torta Vegana de Chocolate', 
      precio: 50000, 
      categoria: 'Productos Vegana', 
      descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.', 
      imagen: '/img/product_13.jfif' 
    },
    { 
      id: 'PV002', 
      nombre: 'Galletas Veganas de Avena', 
      precio: 4500, 
      categoria: 'Productos Vegana', 
      descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.', 
      imagen: '/img/product_14.webp' 
    },
    { 
      id: 'TE001', 
      nombre: 'Torta Especial de Cumpleaños', 
      precio: 55000, 
      categoria: 'Tortas Especiales', 
      descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.', 
      imagen: '/img/product_15.jpg' 
    },
    { 
      id: 'TE002', 
      nombre: 'Torta Especial de Boda', 
      precio: 60000, 
      categoria: 'Tortas Especiales', 
      descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.', 
      imagen: '/img/product_16.webp' 
    }
  ]);

  const [filtro, setFiltro] = useState('Todas');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensajePersonalizado, setMensajePersonalizado] = useState('');

  const categoriasList = [
    'Todas',
    'Tortas Cuadradas',
    'Tortas Circulares',
    'Postres Individuales',
    'Productos Sin Azúcar',
    'Pastelería Tradicional',
    'Productos Sin Gluten',
    'Productos Vegana',
    'Tortas Especiales'
  ];

  const productosFiltrados = filtro === 'Todas' ? productos : productos.filter(p => p.categoria === filtro);

  const handleAgregarConMensaje = (prod) => {
    const tieneMensajeValido = mensajePersonalizado.trim() !== '';
    const productoConPersonalizacion = {
      ...prod,
      mensajeEspecial: tieneMensajeValido ? mensajePersonalizado.trim() : null
    };
    
    agregarAlCarrito(productoConPersonalizacion);
    
    if (tieneMensajeValido) {
      alert(`¡${prod.nombre} agregado al carrito con el mensaje: "${mensajePersonalizado}"!`);
    } else {
      alert(`¡${prod.nombre} agregado al carrito con éxito!`);
    }

    setMensajePersonalizado('');
    setProductoSeleccionado(null);
  };

  return (
    <div className="container-xxl py-5" style={{ backgroundColor: '#FFF5E1' }}>
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
          <p className="section-title bg-white text-center px-3" style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive', fontSize: '1.5rem' }}>
            Nuestro Catálogo
          </p>
          <h1 className="display-6" style={{ color: '#5D4037' }}>
            Delicias hechas con tradición y sabor
          </h1>
        </div>

        
        <div className="row justify-content-center mb-5">
          <div className="col-md-6 col-lg-4 text-center">
            <label className="form-label fw-bold mb-2" style={{ color: '#8B4513' }}>
              Categoría:
            </label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="form-select text-center fw-bold shadow-sm"
              style={{ borderColor: '#8B4513', color: '#8B4513', backgroundColor: '#FFFFFF' }}
            >
              {categoriasList.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat === 'Todas' ? 'Todas las categorías' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div className="row g-4">
          {productosFiltrados.map((prod) => (
            <div className="col-lg-4 col-md-6" key={prod.id}>
              <div className="card h-100 shadow-sm border-0 bg-white">
                
                {/* Imagen limpia */}
                <img 
                  src={prod.imagen} 
                  className="card-img-top" 
                  alt={prod.nombre} 
                  style={{ height: '230px', objectFit: 'cover', cursor: 'pointer' }} 
                  onClick={() => {
                    setProductoSeleccionado(prod);
                    setMensajePersonalizado('');
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 
                    className="card-title" 
                    style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive', cursor: 'pointer' }}
                    onClick={() => {
                      setProductoSeleccionado(prod);
                      setMensajePersonalizado('');
                    }}
                  >
                    {prod.nombre}
                  </h5>
                  
                  <p className="card-text text-secondary mb-3">{prod.descripcion}</p>

                  
                  <div className="mb-3">
                    <span className="fw-bold fs-5" style={{ color: '#8B4513' }}>
                      ${Number(prod.precio).toLocaleString('es-CL')} CLP
                    </span>
                  </div>

                  <div className="d-flex gap-2 mt-auto">
                    <button 
                      className="btn btn-outline-secondary w-50 fw-bold"
                      style={{ borderColor: '#8B4513', color: '#8B4513' }}
                      onClick={() => {
                        setProductoSeleccionado(prod);
                        setMensajePersonalizado('');
                      }}
                    >
                      Ver Detalle
                    </button>
                    
                    <button 
                      className="btn w-50 text-white fw-bold" 
                      style={{ backgroundColor: '#8B4513' }}
                      onClick={() => {
                        agregarAlCarrito({ ...prod, mensajeEspecial: null });
                        alert(`¡${prod.nombre} agregado al carrito con éxito!`);
                      }}
                    >
                      Agregar
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {productoSeleccionado && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header" style={{ backgroundColor: '#FFF5E1' }}>
                <h5 className="modal-title" style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>
                  {productoSeleccionado.nombre}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setProductoSeleccionado(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <img 
                      src={productoSeleccionado.imagen} 
                      alt={productoSeleccionado.nombre} 
                      className="img-fluid rounded shadow-sm"
                      style={{ height: '280px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <span className="badge mb-2 px-3 py-2 text-dark" style={{ backgroundColor: '#FFC0CB' }}>
                      {productoSeleccionado.categoria}
                    </span>
                    <p className="text-secondary mt-2 fs-6">{productoSeleccionado.descripcion}</p>
                    <h4 className="fw-bold my-2" style={{ color: '#8B4513' }}>
                      ${Number(productoSeleccionado.precio).toLocaleString('es-CL')} CLP
                    </h4>

                   
                    <div className="mt-3 p-3 rounded" style={{ backgroundColor: '#FFF5E1', border: '1px dashed #8B4513' }}>
                      <label className="form-label fw-bold small text-dark mb-1">
                         Mensaje especial (Opcional):
                      </label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        placeholder="Déjalo en blanco si no deseas incluir mensaje" 
                        maxLength="50"
                        value={mensajePersonalizado}
                        onChange={(e) => setMensajePersonalizado(e.target.value)}
                      />
                    </div>

                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ backgroundColor: '#FFF5E1' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setProductoSeleccionado(null)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn text-white fw-bold" 
                  style={{ backgroundColor: '#8B4513' }}
                  onClick={() => handleAgregarConMensaje(productoSeleccionado)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;