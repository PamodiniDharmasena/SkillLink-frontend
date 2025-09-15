import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (token) => {
    setToken(token);
    localStorage.setItem('skillLinkJwtToken', token); // Store token in localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('skillLinkJwtToken');
  };

  const isAuthenticated = Boolean(token || localStorage.getItem('skillLinkJwtToken'));

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
