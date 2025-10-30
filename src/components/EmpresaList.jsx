import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EmpresaList() {
  const [empresas, setEmpresas] = useState([]);
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
    axios.get(`https://enterprise-backend-production.up.railway.app/api/empresas/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setEmpresas(response.data);
    })
    .catch(err => {
      console.error('Error al cargar empresas:', err);
      setError('No se pudo cargar la lista de empresas');
    });
  }, [navigate]);

  const handleEliminar = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta empresa?')) return;

    try {
      await axios.delete(`${API_URL}/api/empresas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmpresas(empresas.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      alert('No se pudo eliminar la empresa');
    }
  };

  const handleEditar = (id) => {
    navigate(`/empresas/editar/${id}`);
  };

  const handleAgregar = () => {
    navigate('/empresas/crear');
  };

  return (
    
    <div className="container mt-4">
      <button className="btn btn-success mb-3" onClick={handleAgregar}>
        Agregar Empresa
      </button>
      <h2>Empresas registradas</h2>



      {error && <div className="alert alert-danger">{error}</div>}

      {empresas.length === 0 && !error ? (
        <p>No hay empresas registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>NIT</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa) => (
                <tr key={empresa.id}>
                  <td>{empresa.nombre || '—'}</td>
                  <td>{empresa.direccion || '—'}</td>
                  <td>{empresa.nit || '—'}</td>
                  <td>{empresa.telefono || '—'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEditar(empresa.nit)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminar(empresa.nit)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

