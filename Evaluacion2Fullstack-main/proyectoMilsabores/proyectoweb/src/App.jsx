import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar  from './components/Navbar';
import Home from './views/Home';
import Categorias from './views/Categorias';
import Carrito from './views/Carrito';
import Admin from './views/Admin';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}