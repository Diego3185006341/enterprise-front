import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductoForm() {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    codigo: '',
    nombre: '',
    caracteristicas: '',
    precio: '',
    nitEmpresa: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      codigo: producto.codigo,
      nombre: producto.nombre,
      caracteristicas: producto.caracteristicas,
      precio: parseFloat(producto.precio),
      empresa: {
        nit: producto.nitEmpresa
      }
    };

    try {
      await axios.post('http://localhost:8080/api/productos', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Producto creado correctamente');
      navigate('/productos');
    } catch (err) {
      console.error('Error al crear producto:', err);
      setError('No se pudo crear el producto');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agregar Producto</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Código</label>
          <input
            type="text"
            name="codigo"
            className="form-control"
            value={producto.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Características</label>
          <textarea
            name="caracteristicas"
            className="form-control"
            value={producto.caracteristicas}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            value={producto.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">NIT de Empresa</label>
          <input
            type="text"
            name="nitEmpresa"
            className="form-control"
            value={producto.nitEmpresa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">Crear Producto</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/productos')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}