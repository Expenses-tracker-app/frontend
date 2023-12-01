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
  const [isLoading, setLoading] = useState(true);

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
    if (isLoading) {
      return;
    }

    if (isLoggedIn && location.pathname === paths.login.path) {
      navigate(paths.home.path);
    } else if (!isLoggedIn && location.pathname !== paths.registration.path) {
      navigate(paths.login.path);
    }
  }, [isLoggedIn, navigate, location.pathname, isLoading]);

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
    checkLogin().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
