import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const expiry = localStorage.getItem('tokenExpiry');
      const expiryDate = new Date(expiry);
      const now = new Date();

      if (expiryDate <= now) {
        logout();
      } else {
        setTimeout(logout, expiryDate - now);
      }
    }
  }, []);

  const login = (token, expiry) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', expiry);
    setAuth({
      token,
      isAuthenticated: true,
    });
    setTimeout(logout, new Date(expiry) - new Date());
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    setAuth({
      token: null,
      isAuthenticated: false,
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
