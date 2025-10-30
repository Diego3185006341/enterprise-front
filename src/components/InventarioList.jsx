import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function InventarioList() {


  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [correoDestino, setCorreoDestino] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No estás autenticado. Inicia sesión.');
      navigate('/login');
      return;
    }

    axios.get(`https://enterprise-backend-production.up.railway.app/api/productos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setProductos(response.data);
    })
    .catch(err => {
      console.error('Error al cargar inventario:', err);
      setError('No se pudo cargar el inventario');
    });
  }, [navigate]);

  const handleDescargarPDF = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://enterprise-backend-production.up.railway.app/api/inventario/pdf`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventario.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      alert('No se pudo descargar el PDF');
    }
  };

  const handleEnviarCorreo = async () => {
    if (!correoDestino || !correoDestino.includes('@')) {
      alert('Por favor ingresa un correo válido');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/inventario/email-pdf?destinatario=${correoDestino}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Correo enviado correctamente');
      setCorreoDestino('');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('No se pudo enviar el correo');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Inventario</h2>

      <div className="text-center mb-4 d-flex flex-column align-items-center">
        <button className="btn btn-danger mb-3" onClick={handleDescargarPDF}>
          Descargar PDF
        </button>

        <div className="d-flex gap-2">
          <input
            type="email"
            className="form-control"
            placeholder="Correo destinatario"
            value={correoDestino}
            onChange={(e) => setCorreoDestino(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <button className="btn btn-primary" onClick={handleEnviarCorreo}>
            Enviar correo
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {productos.length === 0 && !error ? (
        <p className="text-center">No hay productos registrados.</p>
      ) : (
        <div className="table-responsive mx-auto" style={{ maxWidth: '900px' }}>
          <table className="table table-bordered table-hover text-center">
            <thead className="table-light">
              <tr>
                <th>Empresa</th>
                <th>Producto</th>
                <th>Características</th>
                <th>Precio</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.codigo}>
                  <td>{producto.empresa?.nombre || '—'}</td>
                  <td>{producto.nombre || '—'}</td>
                  <td>{producto.caracteristicas || '—'}</td>
                  <td>{producto.precio || '—'}</td>
                  <td>{producto.codigo || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}