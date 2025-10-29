import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.jsx';
import EmpresaList from './components/EmpresaList.jsx';
import CreateEmpresaPage from './components/CreateEmpresaPage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import { setAuthToken, getToken } from './api';
import Inicio from './components/Inicio.jsx';
import ProductoList from './components/ProductoList.jsx';
import InvetarioList from './components/InventarioList.jsx';
import EmpresaForm from './components/EmpresaForm.jsx';
import ProductoForm from './components/ProductoForm.jsx';


setAuthToken(getToken());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* hace que la raíz redirija a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/empresas" element={<EmpresaList />} />
        <Route path="/productos" element={<ProductoList />} />
        <Route path="/inventario" element={<InvetarioList />} />
        <Route path="/empresas/editar/:id" element={<EmpresaForm />} />
        <Route path="/empresas/crear" element={<EmpresaForm />} />
        <Route path="/productos/crear" element={<ProductoForm />} />


        <Route
          path="/admin/create"
          element={
            <AdminRoute>
              <CreateEmpresaPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
