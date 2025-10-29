// src/components/CreateEmpresaPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEmpresaPage() {
  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      <h1>Crear Empresa (Prueba)</h1>
      <p>Página de creación de empresa. Usa esto para verificar que la ruta funciona.</p>
      <button className="btn btn-secondary" onClick={() => navigate('/empresas')}>Volver a empresas</button>
    </div>
  );
}
