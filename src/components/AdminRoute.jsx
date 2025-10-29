import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, parseJwt } from '../api';

export default function AdminRoute({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  const p = parseJwt(token);
  const role = p?.rol || p?.role || null;
  if (role !== 'ADMIN') return <Navigate to="/forbidden" replace />;
  return children;
}
