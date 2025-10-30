import React, { useState } from 'react';
import api, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { correo, password } = form;
    if (!correo.trim()) return 'El correo es requerido';
    if (!/\S+@\S+\.\S+/.test(correo)) return 'Ingresa un correo válido';
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('https://enterprise-backend-production.up.railway.app/api/auth/login', form);
      const token = res.data?.token || res.data?.accessToken || res.data;
      if (!token) throw new Error('No se recibió token');

      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/inicio');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Error al iniciar sesión';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card card shadow-sm">
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <img src="/logo192.png" alt="logo" className="login-logo mb-2" />
            <h3 className="mb-0">Iniciar sesión</h3>
            <small className="text-muted d-block">Accede a tu panel de empresas</small>
          </div>

          {error && <div className="alert alert-danger py-2">{String(error)}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                placeholder="tu@correo.com"
                value={form.correo}
                onChange={handleChange}
                disabled={loading}
                autoComplete="username"
              />
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary toggle-pass"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Recuérdame
                </label>
              </div>
              <a className="small" href="#forgot">¿Olvidaste tu contraseña?</a>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary btn-login" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    Iniciando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              ¿No tienes cuenta? <a href="#register">Solicitar acceso</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}