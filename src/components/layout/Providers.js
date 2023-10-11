import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../styles/theme';
import PropTypes from 'prop-types';

export const Providers = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired
};
