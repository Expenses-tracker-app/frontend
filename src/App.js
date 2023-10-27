import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import paths from './utilities/pathnames';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { MyExpensesPage } from './components/pages/MyExpensesPage';
import { Layout } from './components/layout/Layout';
import { Providers } from './components/layout/Providers';
import {SettingsPage} from './components/pages/SettingsPage';
import {RegistrationPage} from './components/pages/RegistrationPage';
import { NewExpensePage } from './components/pages/NewExpense';

function App() {
  return (
    <>
      <BrowserRouter>
        <Providers>
          <Routes>
            <Route element={<Layout />}>
              <Route path={paths.home.path} element={<LandingPage />} />
              <Route path={paths.login.path} element={<LoginPage />} />
              <Route path={paths.myExpenses.path} element={<MyExpensesPage />} />
            </Route>
          </Routes>
        </Providers>
      </BrowserRouter>
    </>
  );
}

export default App;
