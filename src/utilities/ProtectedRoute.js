import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import paths from './pathnames';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return null;
  }
  return isLoggedIn ? children : <Navigate to={paths.login.path} replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
