import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No hay token, redirigiendo al login');
      setError('No estás autenticado. Inicia sesión.');
      navigate('/login');
      return;
    }

    axios.get(`${API_URL}/api/productos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Respuesta del backend:', response.data);
      setProductos(response.data);
    })
    .catch(err => {
      console.error('Error al cargar productos:', err);
      setError('No se pudo cargar la lista de productos');
    });
  }, [navigate]);

  const handleAgregar = () => {
    navigate('/productos/crear');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Productos registrados</h2>

      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={handleAgregar}>
          Agregar Producto
        </button>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {productos.length === 0 && !error ? (
        <p className="text-center">No hay productos registrados.</p>
      ) : (
        <div className="table-responsive tabla-centrada">
          <table className="table table-bordered table-hover text-center mb-0">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Características</th>
                <th>Precio</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.codigo}>
                  <td>{producto.codigo || '—'}</td>
                  <td>{producto.nombre || '—'}</td>
                  <td>{producto.caracteristicas || '—'}</td>
                  <td>{producto.precio || '—'}</td>
                  <td>{producto.empresa?.nombre || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

