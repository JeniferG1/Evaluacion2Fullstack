import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [mensajeCupon, setMensajeCupon] = useState('');
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0);

 
  const [productos, setProductos] = useState([
      { id: 'TC001', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, categoria: 'Tortas Cuadradas', descripcion: 'Deliciosa torta cuadrada sabor chocolate'},
    { id: 'TC002', nombre: 'Torta Cuadrada de Frutas', precio: 50000, categoria: 'Tortas Cuadradas', descripcion: 'Torta cuadrada decorada con frutas frescas'},
    { id: 'TT001', nombre: 'Torta Circular de Vainilla', precio: 40000, categoria: 'Tortas Circulares', descripcion: 'Clásica torta circular de vainilla'},
    { id: 'TT002', nombre: 'Torta Circular de Manjar', precio: 42000, categoria: 'Tortas Circulares', descripcion: 'Torta circular rellena con manjar artesanal' },
    { id: 'PI001', nombre: 'Mousse de Chocolate', precio: 5000, categoria: 'Postres Individuales', descripcion: 'Postre individual de mousse de chocolate' },
    { id: 'PI002', nombre: 'Tiramisú Clásico', precio: 5500, categoria: 'Postres Individuales', descripcion: 'Tradicional tiramisú italiano' },
    { id: 'PSA001', nombre: 'Torta Sin Azúcar de Naranja', precio: 48000, categoria: 'Productos Sin Azúcar', descripcion: 'Torta especial sin azúcar sabor naranja' },
    { id: 'PSA002', nombre: 'Cheesecake Sin Azúcar', precio: 47000, categoria: 'Productos Sin Azúcar', descripcion: 'Cheesecake apto sin azúcar' },
    { id: 'PT001', nombre: 'Empanada de Manzana', precio: 3000, categoria: 'Pastelería Tradicional', descripcion: 'Empanadita dulce rellena de manzana' },
    { id: 'PT002', nombre: 'Tarta de Santiago', precio: 6000, categoria: 'Pastelería Tradicional', descripcion: 'Tarta tradicional de almendras' },
    { id: 'PG001', nombre: 'Brownie Sin Gluten', precio: 4000, categoria: 'Productos Sin Gluten', descripcion: 'Brownie elaborado sin gluten' },
    { id: 'PG002', nombre: 'Pan Sin Gluten', precio: 3500, categoria: 'Productos Sin Gluten', descripcion: 'Pan artesanal sin gluten' },
    { id: 'PV001', nombre: 'Torta Vegana de Chocolate', precio: 50000, categoria: 'Productos Vegana', descripcion: 'Torta 100% vegana de chocolate' },
    { id: 'PV002', nombre: 'Galletas Veganas de Avena', precio: 4500, categoria: 'Productos Vegana', descripcion: 'Galletas de avena veganas' },
    { id: 'TE001', nombre: 'Torta Especial de Cumpleaños', precio: 55000, categoria: 'Tortas Especiales', descripcion: 'Torta decorada especial para cumpleaños' },
    { id: 'TE002', nombre: 'Torta Especial de Boda', precio: 60000, categoria: 'Tortas Especiales', descripcion:'Torta elegante para matrimonios'}
  ]);


  const agregarProductoAdmin = (nuevoProducto) => {
    const productoConId = {
      ...nuevoProducto,
      id: Date.now(), 
      precio: Number(nuevoProducto.precio)
    };
    setProductos((prevProductos) => [...prevProductos, productoConId]);
  };

  const eliminarProductoAdmin = (id) => {
    setProductos((prevProductos) => prevProductos.filter((prod) => prod.id !== id));
  };


  const agregarAlCarrito = (producto) => {
    setCart((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === producto.id);
      if (itemExistente) {
        return prevCart.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  
  const cambiarCantidad = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };


  const eliminarDelCarrito = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCart([]);
    setDescuentoPorcentaje(0);
    setMensajeCupon('');
  };

  const aplicarCupon = (codigo) => {
    const codigoLimpidio = codigo.trim().toUpperCase();
    if (codigoLimpidio === 'MILSABORES10') {
      setDescuentoPorcentaje(10);
      setMensajeCupon('¡Cupón aplicado con éxito! 10% de descuento.');
    } else if (codigoLimpidio === 'DUOC2026' || codigoLimpidio === 'FELICES50') {
      setDescuentoPorcentaje(20);
      setMensajeCupon('¡Cupón especial de aniversario aplicado! 20% de descuento.');
    } else {
      setDescuentoPorcentaje(0);
      setMensajeCupon('Cupón inválido o expirado.');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalDescuento = (subtotal * descuentoPorcentaje) / 100;
  const total = subtotal - totalDescuento;

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        total,
        totalDescuento,
        productos,                 
        agregarProductoAdmin,     
        eliminarProductoAdmin,     
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        aplicarCupon,
        mensajeCupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);