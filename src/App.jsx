
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Inicio from './components/Inicio';
import EmpresaList from './components/EmpresaList'; 
import ProductoList from './components/ProductoList'; 
import InventarioList from './components/InventarioList'; 
import EmpresaForm from './components/EmpresaForm';
import ProductoForm from './components/ProductoForm';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/empresas" element={<EmpresaList />} />
      <Route path="/productos" element={<ProductoList />} />
      <Route path="/inventario" element={<InventarioList />} />
      <Route path="/empresas/editar/:id" element={<EmpresaForm />} />
      <Route path="/empresas/crear" element={<EmpresaForm />} />
      <Route path="/productos/crear" element={<ProductoForm />} />




    </Routes>
  );
}
