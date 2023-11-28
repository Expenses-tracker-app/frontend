import paths from './utilities/pathnames';
import { MainPage } from './components/pages/MainPage';
import { LoginPage } from './components/pages/LoginPage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { Layout } from './components/layout/Layout';
import { SettingsPage } from './components/pages/SettingsPage';
import { RegistrationPage } from './components/pages/RegistrationPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { CategoriesPage } from './components/pages/CategoriesPage';
import { AuthContext } from './utilities/AuthContext';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';

export function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.login.path} element={<LoginPage />} />
        <Route path={paths.registration.path} element={<RegistrationPage />} />

        <Route
          path={paths.home.path}
          element={isLoggedIn ? <MainPage /> : <Navigate to={paths.login.path} replace />}
        />

        <Route
          path={paths.transactions.path}
          element={isLoggedIn ? <TransactionsPage /> : <Navigate to={paths.login.path} replace />}
        />

        <Route
          path={paths.settings.path}
          element={isLoggedIn ? <SettingsPage /> : <Navigate to={paths.login.path} replace />}
        />

        <Route
          path={paths.categories.path}
          element={isLoggedIn ? <CategoriesPage /> : <Navigate to={paths.login.path} replace />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
