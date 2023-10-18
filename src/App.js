import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import paths from './utilities/pathnames';
import { LandingPage } from './components/pages/LandingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { MyExpensesPage } from './components/pages/MyExpensesPage';
import { Layout } from './components/layout/Layout';
import { Providers } from './components/layout/Providers';
import {SettingsPage} from './components/pages/SettingsPage';
import {RegistrationPage} from './components/pages/RegistrationPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Providers>
          <Routes>
            <Route element={<Layout />}>
              <Route path={paths.home.path} element={<LandingPage />} />
              <Route path={paths.profile.path} element={<ProfilePage />} />
              <Route path={paths.myExpenses.path} element={<MyExpensesPage />} />
              <Route path={paths.settings.path} element={<SettingsPage />} />
              <Route path={paths.registration.path} element={<RegistrationPage />} />
            </Route>
          </Routes>
        </Providers>
      </BrowserRouter>
    </>
  );
}

export default App;
