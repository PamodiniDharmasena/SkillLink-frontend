

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access authentication status

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
