import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const regionesYComunas = {
  "Metropolitana de Santiago": ["Santiago", "Maipú", "Puente Alto", "Providencia", "Las Condes", "Ñuñoa", "La Florida"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "San Antonio"],
  "Biobío": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Los Ángeles"],
  "Maule": ["Talca", "Curicó", "Linares", "Constitución"],
  "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"]
};

const Registro = () => {
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    region: '',
    comuna: '',
    direccion: '',
    cupon: ''
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const { registrarUsuario, login } = useAuth();
  const navigate = useNavigate();

  const validarRutReal = (rutCompleto) => {
    // Limpiar puntos y guiones
    const valor = rutCompleto.replace(/\./g, '').replace(/-/g, '').trim();
    
    if (valor.length < 7 || valor.length > 9) return false;
    
    const cuerpo = valor.slice(0, -1);
    const dv = valor.slice(-1).toUpperCase();

    if (!/^\d+$/.test(cuerpo)) return false;

    const numCuerpo = parseInt(cuerpo, 10);

    // Validación de rango real en Chile (aprox. entre 3.000.000 y 30.000.000)
    if (numCuerpo < 3000000 || numCuerpo > 30000000) {
      return false;
    }


    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpo.charAt(i), 10);
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dvEsperado === dv;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'region') {
      setComunasDisponibles(regionesYComunas[value] || []);
      setFormData(prev => ({ ...prev, region: value, comuna: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.run || !formData.nombre || !formData.email || !formData.password || !formData.confirmPassword || !formData.region || !formData.comuna || !formData.direccion) {
      setMensaje('Por favor completa todos los campos obligatorios.');
      return;
    }

    // Validar RUN real
    if (!validarRutReal(formData.run)) {
      setMensaje('El RUN ingresado no es válido o no corresponde a un documento real. Ej: 19011022-K');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMensaje('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    const resultado = registrarUsuario({
      run: formData.run,
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      fechaNacimiento: formData.fechaNacimiento,
      region: formData.region,
      comuna: formData.comuna,
      direccion: formData.direccion,
      cupon: formData.cupon
    });

    if (!resultado.success) {
      setMensaje(resultado.message);
      return;
    }

    let beneficio = '';
    if (formData.cupon.toUpperCase() === 'FELICES50') {
      beneficio = ' ¡Cupón FELICES50 activado!';
    }
    if (formData.email.endsWith('@duocuc.cl')) {
      beneficio += ' ¡Beneficio Duoc UC: Torta de cumpleaños de regalo!';
    }

    login(formData.email, formData.password);

    alert(`¡Cuenta creada y registrada con éxito!${beneficio}`);
    navigate('/');
  };

  return (
    <div className="row justify-content-center py-5">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow border-0 p-4 bg-white rounded">
          <h2 className="text-center mb-4" style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>
            Registro de Usuarios
          </h2>

          {mensaje && <div className="alert alert-danger py-2">{mensaje}</div>}

          <form onSubmit={handleSubmit}>
            
            {/* RUN */}
            <div className="mb-3">
              <label className="form-label fw-bold">RUN</label>
              <input 
                type="text" 
                name="run"
                className="form-control" 
                placeholder="Ej: 19011022K"
                value={formData.run}
                onChange={handleChange}
                required 
              />
              <small className="text-muted">Ingrese sin puntos y con guion opcional (Ej: 19011022K)</small>
            </div>

            {/* Nombre Completo */}
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre Completo</label>
              <input 
                type="text" 
                name="nombre"
                className="form-control" 
                placeholder="Juan Pérez"
                value={formData.nombre}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Correo Electrónico */}
            <div className="mb-3">
              <label className="form-label fw-bold">Correo Electrónico</label>
              <input 
                type="email" 
                name="email"
                className="form-control" 
                placeholder="nombre@correo.cl"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label className="form-label fw-bold">Contraseña</label>
              <input 
                type="password" 
                name="password"
                className="form-control" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-3">
              <label className="form-label fw-bold">Confirmar Contraseña</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="form-control" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Fecha de Nacimiento (Opcional) */}
            <div className="mb-3">
              <label className="form-label fw-bold">Fecha de nacimiento (opcional)</label>
              <input 
                type="date" 
                name="fechaNacimiento"
                className="form-control" 
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            {/* Región */}
            <div className="mb-3">
              <label className="form-label fw-bold">Región</label>
              <select 
                name="region"
                className="form-select"
                value={formData.region}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleccione la región --</option>
                {Object.keys(regionesYComunas).map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>

            {/* Comuna */}
            <div className="mb-3">
              <label className="form-label fw-bold">Comuna</label>
              <select 
                name="comuna"
                className="form-select"
                value={formData.comuna}
                onChange={handleChange}
                disabled={!formData.region}
                required
              >
                <option value="">-- Seleccione la comuna --</option>
                {comunasDisponibles.map((com) => (
                  <option key={com} value={com}>{com}</option>
                ))}
              </select>
            </div>

            {/* Dirección */}
            <div className="mb-3">
              <label className="form-label fw-bold">Dirección</label>
              <input 
                type="text" 
                name="direccion"
                className="form-control" 
                placeholder="Av. Libertador 1234"
                value={formData.direccion}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Código Promocional */}
            <div className="mb-3">
              <label className="form-label fw-bold">Código Promocional (Opcional)</label>
              <input 
                type="text" 
                name="cupon"
                className="form-control" 
                placeholder="Ej: FELICES50"
                value={formData.cupon}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn w-100 text-white py-2 fw-bold" style={{ backgroundColor: '#8B4513' }}>
              Registrarse
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#8B4513' }}>Inicia sesión aquí</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;