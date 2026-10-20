import React from 'react';
import { obtenerProductos } from '../data/productos';

const Admin = () => {
  const productos = obtenerProductos();

  return (
    <div className="container mt-4">
      <h2>Panel de Administración (CRUD)</h2>
      <p className="text-muted">Gestiona el inventario de la tienda.</p>
      
      <table className="table table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>${p.precio.toLocaleString('es-CL')}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2">Editar</button>
                <button className="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;