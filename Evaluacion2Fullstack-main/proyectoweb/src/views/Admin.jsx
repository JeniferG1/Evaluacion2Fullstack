import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Admin() {
  const { productos, agregarProductoAdmin, eliminarProductoAdmin } = useCart();

  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    categoria: 'Postres',
    descripcion: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) {
      alert('Por favor completa el nombre y precio del producto');
      return;
    }
    agregarProductoAdmin(form);
    setForm({ nombre: '', precio: '', categoria: 'Postres', descripcion: '' });
    alert('¡Producto agregado correctamente!');
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4" style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>
        Panel de Administración - Mil Sabores 
      </h2>

      <div className="row">
        
        <div className="col-md-5 mb-4">
          <div className="card p-4 shadow-sm border-0 bg-white rounded">
            <h4 className="mb-3" style={{ color: '#8B4513' }}>Agregar Nuevo Producto</h4>
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ej: Torta Amor"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Precio ($)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: e.target.value })}
                  placeholder="Ej: 15000"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Categoría</label>
                <select
                  className="form-select"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                >
                  <option value="Tortas">Tortas</option>
                  <option value="Postres">Postres</option>
                  <option value="Galletas">Galletas</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Descripción</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  placeholder="Breve descripción del producto..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn w-100 text-white py-2 fw-bold" 
                style={{ backgroundColor: '#8B4513' }}
              >
                Guardar Producto
              </button>
            </form>
          </div>
        </div>

        
        <div className="col-md-7">
          <div className="card p-4 shadow-sm border-0 bg-white rounded">
            <h4 className="mb-3" style={{ color: '#8B4513' }}>Inventario Actual ({productos.length} productos)</h4>
            <div className="table-responsive mt-2">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No hay productos registrados en el inventario.
                      </td>
                    </tr>
                  ) : (
                    productos.map((prod) => (
                      <tr key={prod.id || prod.nombre}>
                        <td>{prod.nombre}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {prod.categoria || 'General'}
                          </span>
                        </td>
                        <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => eliminarProductoAdmin(prod.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}