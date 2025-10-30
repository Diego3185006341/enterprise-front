import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Inicio from './components/Inicio';
import EmpresaList from './components/EmpresaList'; 
import ProductoList from './components/ProductoList'; 
import InventarioList from './components/InventarioList'; 
import EmpresaForm from './components/EmpresaForm';
import ProductoForm from './components/ProductoForm';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/inicio" element={
          <ProtectedRoute><Inicio /></ProtectedRoute>
        } />
        <Route path="/empresas" element={
          <ProtectedRoute><EmpresaList /></ProtectedRoute>
        } />
        <Route path="/productos" element={
          <ProtectedRoute><ProductoList /></ProtectedRoute>
        } />
        <Route path="/inventario" element={
          <ProtectedRoute><InventarioList /></ProtectedRoute>
        } />
        <Route path="/empresas/editar/:id" element={
          <ProtectedRoute><EmpresaForm /></ProtectedRoute>
        } />
        <Route path="/empresas/crear" element={
          <ProtectedRoute><EmpresaForm /></ProtectedRoute>
        } />
        <Route path="/productos/crear" element={
          <ProtectedRoute><ProductoForm /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
