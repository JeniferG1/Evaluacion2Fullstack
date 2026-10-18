import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import { AuthProvider } from '../context/AuthContext';

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component Unit Tests', () => {
  it('debe renderizar el título y los campos de texto', () => {
    renderLogin();
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ejemplo@duoc.cl')).toBeInTheDocument();
  });

  it('debe mostrar mensaje de error si se envía el formulario vacío', () => {
    renderLogin();
    const botonSubmit = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.click(botonSubmit);

    expect(screen.getByText(/Por favor, ingresa tu correo y contraseña/i)).toBeInTheDocument();
  });
});