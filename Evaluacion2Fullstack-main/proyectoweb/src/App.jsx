import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Categorias from './views/Categorias';
import Carrito from './views/Carrito';
import Login from './views/Login';
import Registro from './views/Registro';
import Admin from './views/Admin'; 

function App() {
  return (
    <div style={{ backgroundColor: '#FFF5E1', minHeight: '100vh' }}>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;