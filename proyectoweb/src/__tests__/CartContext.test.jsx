import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';

describe('CartContext Unit Tests', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  it('debe iniciar con el carrito vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.carrito).toEqual([]);
  });

  it('debe agregar un producto al carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const productoPrueba = { id: 1, nombre: 'Torta Amor', precio: 15000 };

    act(() => {
      result.current.agregarAlCarrito(productoPrueba);
    });

    expect(result.current.carrito.length).toBe(1);
    expect(result.current.carrito[0].nombre).toBe('Torta Amor');
  });
});