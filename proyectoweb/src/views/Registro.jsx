import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensaje, setMensaje] = useState('');

  const { registrarUsuario } = useAuth();
  const navigate = useNavigate();

  // Función para calcular la edad exacta en años
  const calcularEdad = (fechaNac) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fechaNacimiento) {
      setMensaje('Por favor, ingresa tu fecha de nacimiento.');
      return;
    }

    const edad = calcularEdad(fechaNacimiento);
    const tieneDescuentoSenior = edad >= 50;

    const nuevoUsuario = {
      nombre,
      email,
      password,
      fechaNacimiento,
      edad,
      esSenior: tieneDescuentoSenior,
      descuento: tieneDescuentoSenior ? 0.50 : 0 // 50% de descuento si tiene 50+ años
    };

    registrarUsuario(nuevoUsuario);

    if (tieneDescuentoSenior) {
      alert('Por ser mayor de 50 años tienes un 50% de descuento en todos tus productos.');
    } else {
      alert('¡Cuenta creada con éxito!');
    }

    navigate('/');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 rounded-3 p-4 bg-white">
            <h2 className="text-center fw-bold mb-4">Crear Cuenta 🍰</h2>
            
            {mensaje && <div className="alert alert-warning">{mensaje}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  className="form-control" 
                  required 
                  value={fechaNacimiento} 
                  onChange={(e) => setFechaNacimiento(e.target.value)} 
                />
                <small className="text-muted">
                  👵 Si tienes 50 años o más, obtendrás automáticamente un 50% de descuento.
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>

              <button type="submit" className="btn btn-warning w-100 fw-bold py-2 rounded-pill mt-3">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}