import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EmpresaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState({
    nombre: '',
    direccion: '',
    nit: '',
    telefono: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Si no hay ID, es creación

    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/api/empresas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setEmpresa(response.data);
    })
    .catch(err => {
      console.error('Error al cargar empresa:', err);
      setError('No se pudo cargar la empresa');
    });
  }, [id]);

  const handleChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (id) {
        await axios.put(`${API_URL}/api/empresas/${id}`, empresa, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Empresa actualizada correctamente');
      } else {
        await axios.post(`${API_URL}/api/empresas`, empresa, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Empresa creada correctamente');
      }

      navigate('/empresas');
    } catch (err) {
      console.error('Error al guardar empresa:', err);
      alert('No se pudo guardar la empresa');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{id ? 'Editar Empresa' : 'Agregar Empresa'}</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={empresa.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={empresa.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">NIT</label>
          <input
            type="text"
            name="nit"
            className="form-control"
            value={empresa.nit}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            value={empresa.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {id ? 'Guardar cambios' : 'Crear empresa'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/empresas')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

