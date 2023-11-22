import { css, GlobalStyles as MGlobalStyles } from '@mui/material';
import React from 'react';
const styles = css`
  html,
  body {
    margin: 0;
    height: 100%;
    width: 100%;
    color: white;
  }

  #root {
    position: fixed;
    width: 100%;
    height: 100%;
    background: black;
  }
`;

export const GlobalStyles = () => {
  return <MGlobalStyles styles={styles} />;
};
