import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = async () => {
    if (token) {
      try {
        await api.post('/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {}
    }
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 