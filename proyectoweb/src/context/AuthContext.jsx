import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuarioMilSabores');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const registrarUsuario = (datosUsuario) => {
    setUsuarioLogueado(datosUsuario);
    localStorage.setItem('usuarioMilSabores', JSON.stringify(datosUsuario));
  };

  const logoutUsuario = () => {
    setUsuarioLogueado(null);
    localStorage.removeItem('usuarioMilSabores');
  };

  return (
    <AuthContext.Provider value={{ usuarioLogueado, registrarUsuario, logoutUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);