import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../styles/theme';
import PropTypes from 'prop-types';
import { AuthProvider } from '../../utilities/AuthContext';

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <ThemeProvider theme={theme}> {children} </ThemeProvider>
    </AuthProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired
};
