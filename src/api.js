import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080'
});

export function setAuthToken(token) {
  if (token) {
    sessionStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    sessionStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
}

export function getToken() {
  return sessionStorage.getItem('token');
}

export function parseJwt(token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

const tokenStored = getToken();
if (tokenStored) api.defaults.headers.common['Authorization'] = `Bearer ${tokenStored}`;

export default api;
