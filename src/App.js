import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import paths from './utilities/pathnames';
import { LandingPage } from './components/pages/LandingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { Layout } from './components/layout/Layout';
import { Providers } from './components/layout/Providers';

function App() {
  return (
    <>
      <BrowserRouter>
        <Providers>
          <Routes>
            <Route element={<Layout />}>
              <Route path={paths.home.path} element={<LandingPage />} />
              <Route path={paths.profile.path} element={<ProfilePage />} />
            </Route>
          </Routes>
        </Providers>
      </BrowserRouter>
    </>
  );
}

export default App;
