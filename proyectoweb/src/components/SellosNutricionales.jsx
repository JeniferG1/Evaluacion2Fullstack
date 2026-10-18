import { useEffect, useState } from 'react';
import axios from 'axios';

export const SellosNutricionales = ({ nombreProducto }) => {
  const [sellos, setSellos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerInformacionNutricional = async () => {
      try {
        setCargando(true);
        // Consulta a la API de Open Food Facts por palabra clave
        const response = await axios.get(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(nombreProducto)}&search_simple=1&action=process&json=1`
        );

        if (response.data.products && response.data.products.length > 0) {
          const producto = response.data.products[0];
          const nutriments = producto.nutriments || {};
          const nuevosSellos = [];

          // Criterios aproximados Ley de Etiquetado (por cada 100g)
          if (nutriments.sugars_100g > 10) nuevosSellos.push('ALTO EN AZÚCARES');
          if (nutriments['saturated-fat_100g'] > 4) nuevosSellos.push('ALTO EN GRASAS SATURADAS');
          if (nutriments.energy_100g > 275) nuevosSellos.push('ALTO EN CALORÍAS');
          if (nutriments.sodium_100g > 0.4) nuevosSellos.push('ALTO EN SODIO');

          setSellos(nuevosSellos);
        } else {
          // Valores por defecto si la búsqueda no arroja resultados
          setSellos(['ALTO EN AZÚCARES', 'ALTO EN CALORÍAS']);
        }
      } catch (error) {
        console.error('Error al consultar la API nutricional:', error);
        // Valores por defecto en caso de error de red
        setSellos(['ALTO EN AZÚCARES', 'ALTO EN CALORÍAS']);
      } finally {
        setCargando(false);
      }
    };

    if (nombreProducto) {
      obtenerInformacionNutricional();
    }
  }, [nombreProducto]);

  if (cargando) {
    return <small className="text-muted">Cargando información nutricional...</small>;
  }

  return (
    <div className="d-flex flex-wrap gap-1 my-2">
      {sellos.map((sello, index) => (
        <span key={index} className="badge bg-dark text-white border border-secondary p-1" style={{ fontSize: '0.7rem' }}>
          {sello}
        </span>
      ))}
    </div>
  );
};