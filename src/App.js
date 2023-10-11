import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import paths from './utilities/pathnames';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import LandingPage from './components/pages/LandingPage';
import Profile from './components/pages/Profile';
import { Layout } from './components/layout/Layout';
import { GlobalStyles } from './components/layout/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path={paths.home.path} element={<LandingPage />} />
              <Route path={paths.profile.path} element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
