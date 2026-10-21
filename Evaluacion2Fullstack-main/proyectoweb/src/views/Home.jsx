import React from 'react';

const Home = () => {
  return (
    <div>
      
      <div className="container-fluid hero-header py-5 mb-5" style={{ backgroundColor: '#FFF5E1' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <p className="text-uppercase fw-bold mb-2" style={{ color: '#8B4513' }}>50 Años de Tradición</p>
              <h1 className="display-4 mb-4" style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>
                La verdadera calidad y sabor artesanal en cada bocado
              </h1>
              <p className="fs-5 mb-4" style={{ color: '#5D4037' }}>
                Celebramos medio siglo endulzando los momentos más importantes de las familias chilenas. Desde nuestros inicios en el récord Guinness de 1995 hasta la innovación actual junto a Duoc UC.
              </p>
              <a href="/categorias" className="btn py-3 px-4 text-white" style={{ backgroundColor: '#8B4513' }}>
                Ver Catálogo de Productos
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.1s" src="/img/Pastel artesanal.jpg" alt="Pastel artesanal" />
                </div>
                <div className="col-6 text-start">
                  <img className="img-fluid rounded w-200 wow zoomIn" data-wow-delay="0.3s" src="/img/Pasteleria.jpg" alt="Panadería y pastelería" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <div className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm border-0">
              <h3 style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>Descuento +50</h3>
              <p className="text-muted">50% de descuento automático para clientes mayores de 50 años.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm border-0">
              <h3 style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>Código FELICES50</h3>
              <p className="text-muted">Utiliza el código al registrarte y obtén beneficios exclusivos de aniversario.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm border-0">
              <h3 style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>Comunidad Duoc</h3>
              <p className="text-muted">Torta de cumpleaños de regalo para estudiantes con correo institucional registrado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
