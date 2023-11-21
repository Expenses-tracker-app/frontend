import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { logout } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import paths from './pathnames';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate(paths.home.path);
  };

  const handleLogout = async () => {
    try {
      await logout({});
      setIsLoggedIn(false);
      navigate(paths.login.path);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
