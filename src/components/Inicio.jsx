import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

export default function Inicio() {
  const navigate = useNavigate();

  const opciones = [
    {
      ruta: '/empresas',
      icono: 'bi-building',
      titulo: 'Empresas',
      descripcion: 'Gestiona tus empresas registradas',
    },
    {
      ruta: '/productos',
      icono: 'bi-box-seam',
      titulo: 'Productos',
      descripcion: 'Administra tus productos y stock',
    },
    {
      ruta: '/inventario',
      icono: 'bi-clipboard-data',
      titulo: 'Inventario',
      descripcion: 'Consulta y actualiza el inventario disponible',
    },

  ];

  return (
    <div className="inicio-page">
      <header className="inicio-navbar">
        <span>Bienvenido</span>
      </header>

      <main className="inicio-center">
        <h4 className="inicio-title">¿Qué deseas gestionar hoy?</h4>
        <section className="inicio-options">
          {opciones.map(({ ruta, icono, titulo, descripcion }) => (
            <div
              key={ruta}
              className="inicio-card"
              onClick={() => navigate(ruta)}
            >
              <i className={`bi ${icono}`}></i>
              <h4>{titulo}</h4>
              <p>{descripcion}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

