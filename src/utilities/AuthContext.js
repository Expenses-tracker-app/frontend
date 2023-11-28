import React, { createContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { logout } from '../services/apiService';
import { useNavigate, useLocation } from 'react-router-dom';
import paths from './pathnames';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await logout({});
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn && location.pathname === paths.login.path) {
      navigate(paths.home.path);
    } else if (!isLoggedIn) {
      navigate(paths.login.path);
    }
  }, [isLoggedIn, navigate, location.pathname]);

  const checkLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/checkLogin`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error.message);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
