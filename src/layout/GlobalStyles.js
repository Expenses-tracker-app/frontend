import { css, GlobalStyles as MGlobalStyles } from '@mui/material';

const styles = css`
  html,
  body {
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  }

  #root {
    position: fixed;
    width: 100%;
    height: 100%;
  }
`;

export const GlobalStyles = () => {
  return <MGlobalStyles styles={styles} />;
};
