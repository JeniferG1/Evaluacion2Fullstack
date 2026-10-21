import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export function Carrito() {
  const {
    cart,
    subtotal,
    total,
    totalDescuento,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    aplicarCupon,
    mensajeCupon,
  } = useCart();

  const [inputCupon, setInputCupon] = useState('');

  const handleCuponSubmit = (e) => {
    e.preventDefault();
    aplicarCupon(inputCupon);
  };

  const handlePago = () => {
    alert('¡Pago Exitoso! Muchas gracias por tu compra en Pastelería Mil Sabores. Tu pedido está en preparación.');
    vaciarCarrito(); 
  };

  if (cart.length === 0) {
    return (
      <div className="container-xxl py-5">
        <div className="container text-center py-5">
          <div className="p-5 bg-light rounded-3 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
            <h2 className="mb-3 fw-bold">Tu Carrito está Vacío</h2>
            <p className="text-muted mb-4">¡Añade algunos deliciosos productos de nuestra pastelería para comenzar!</p>
            <Link to="/categorias" className="btn text-white rounded-pill py-3 px-5 fw-bold" style={{ backgroundColor: '#8B4513' }}>
              Ver Productos 🛒
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
          <h1 className="display-6 mb-3 fw-bold" style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>Carrito de Compras 🛒</h1>
          <p className="text-muted">Revisa tus productos seleccionados antes de proceder al pago</p>
          <hr className="w-25 mx-auto" style={{ backgroundColor: '#8B4513', height: '3px' }} />
        </div>

        <div className="row g-4">
          
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4 mb-4 bg-white">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th className="py-3">Producto</th>
                      <th className="py-3">Precio</th>
                      <th className="py-3 text-center">Cantidad</th>
                      <th className="py-3">Subtotal</th>
                      <th className="py-3 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="fw-bold d-block">{item.nombre}</span>

                        
                          {item.mensajeEspecial && 
                           item.mensajeEspecial !== 'Sin mensaje' && 
                           item.mensajeEspecial !== 'Sin mensaje especial' && 
                           item.mensajeEspecial.trim() !== '' && (
                            <div 
                              className="mt-1 p-2 rounded shadow-sm" 
                              style={{ backgroundColor: '#FFF5E1', borderLeft: '3px solid #8B4513', maxWidth: '280px' }}
                            >
                              <small className="fw-bold d-block" style={{ color: '#8B4513' }}>
                                Mensaje personal:
                              </small>
                              <small className="text-secondary fst-italic">
                                "{item.mensajeEspecial}"
                              </small>
                            </div>
                          )}
                        </td>
                        <td>${item.precio?.toLocaleString('es-CL')} CLP</td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-sm btn-outline-secondary px-2"
                              onClick={() => cambiarCantidad(item.id, -1)}
                            >
                              -
                            </button>
                            <span className="mx-3 fw-bold">{item.cantidad}</span>
                            <button
                              className="btn btn-sm btn-outline-secondary px-2"
                              onClick={() => cambiarCantidad(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')} CLP</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-danger rounded-circle"
                            onClick={() => eliminarDelCarrito(item.id)}
                            title="Eliminar producto"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-outline-danger rounded-pill px-4" onClick={vaciarCarrito}>
                  Vaciar Carrito 
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            
            <div className="card border-0 shadow-sm p-4 mb-4 bg-white">
              <h5 className="fw-bold mb-3" style={{ color: '#8B4513' }}>Cupón de Descuento</h5>
              <form onSubmit={handleCuponSubmit} className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Ej: MILSABORES10"
                  value={inputCupon}
                  onChange={(e) => setInputCupon(e.target.value)}
                />
                <button type="submit" className="btn text-white px-4" style={{ backgroundColor: '#8B4513' }}>
                  Aplicar
                </button>
              </form>
              {mensajeCupon && (
                <small
                  className={`mt-2 fw-bold ${
                    mensajeCupon.includes('éxito') || mensajeCupon.includes('aplicado')
                      ? 'text-success'
                      : 'text-danger'
                  }`}
                >
                  {mensajeCupon}
                </small>
              )}
              <small className="text-muted mt-2">Prueba cupones: <b>MILSABORES10</b>, <b>DUOC2026</b></small>
            </div>

            <div className="card border-0 shadow-sm p-4 bg-white">
              <h4 className="fw-bold mb-3" style={{ color: '#8B4513' }}>Resumen de Compra</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal:</span>
                <span className="fw-bold">${subtotal.toLocaleString('es-CL')} CLP</span>
              </div>
              {totalDescuento > 0 && (
                <div className="d-flex justify-content-between text-success mb-2">
                  <span>Descuento aplicado:</span>
                  <span className="fw-bold">-${totalDescuento.toLocaleString('es-CL')} CLP</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between h5 fw-bold mb-4">
                <span>Total:</span>
                <span style={{ color: '#8B4513' }}>${total.toLocaleString('es-CL')} CLP</span>
              </div>
              <button
                className="btn text-white w-100 py-3 rounded-pill fw-bold shadow-sm"
                style={{ backgroundColor: '#8B4513' }}
                onClick={handlePago}
              >
                Proceder al Pago 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;