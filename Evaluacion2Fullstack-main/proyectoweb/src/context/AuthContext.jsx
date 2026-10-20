import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  
  // Cargar usuarios registrados previamente o iniciar con arreglo vacío
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(() => {
    const saved = localStorage.getItem('usuarios_mil_sabores');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('usuarios_mil_sabores', JSON.stringify(usuariosRegistrados));
  }, [usuariosRegistrados]);

  // Función para registrar un nuevo usuario
  const registrarUsuario = (nuevoUsuario) => {
    const existe = usuariosRegistrados.some(u => u.email === nuevoUsuario.email);
    if (existe) {
      return { success: false, message: 'El correo electrónico ya se encuentra registrado. Intenta iniciar sesión.' };
    }
    const actualizados = [...usuariosRegistrados, nuevoUsuario];
    setUsuariosRegistrados(actualizados);
    return { success: true };
  };

  // Función para iniciar sesión (Valida que la cuenta exista)
  const login = (email, password) => {
    const usuario = usuariosRegistrados.find(u => u.email === email && u.password === password);
    if (!usuario) {
      return { success: false, message: 'No existe una cuenta registrada con este correo o la contraseña es incorrecta. Debes registrarte primero.' };
    }
    setUsuarioLogueado(usuario);
    return { success: true };
  };

  const logout = () => {
    setUsuarioLogueado(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioLogueado, registrarUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);