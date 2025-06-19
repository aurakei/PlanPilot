import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo';
import { AuthProvider, useAuth } from './AuthContext';

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return token ? children : <Navigate to="/login" />;
}

function LogoutButton() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  if (!token) return null;
  return <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>;
}

function AppRoutes() {
  return (
    <>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/register">Register</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/user">User Info</Link> |{' '}
        <LogoutButton />
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}