import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';

describe('CartContext Unit Tests', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  it('debe iniciar con el carrito vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const carritoActual = result.current.carrito || result.current.cart || [];
    expect(carritoActual).toEqual([]);
  });

  it('debe agregar un producto al carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const productoPrueba = { id: 1, nombre: 'Torta Amor', precio: 15000 };

    act(() => {
      if (result.current.agregarAlCarrito) {
        result.current.agregarAlCarrito(productoPrueba);
      } else if (result.current.addToCart) {
        result.current.addToCart(productoPrueba);
      }
    });

    const carritoActual = result.current.carrito || result.current.cart || [];
    expect(carritoActual.length).toBe(1);
    expect(carritoActual[0].nombre).toBe('Torta Amor');
  });
});