import paths from './utilities/pathnames';
import { MainPage } from './components/pages/MainPage';
import { LoginPage } from './components/pages/LoginPage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { Layout } from './components/layout/Layout';
import { SettingsPage } from './components/pages/SettingsPage';
import { RegistrationPage } from './components/pages/RegistrationPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { CategoriesPage } from './components/pages/CategoriesPage';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { ProtectedRoute } from './utilities/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.login.path} element={<LoginPage />} />
        <Route path={paths.registration.path} element={<RegistrationPage />} />

        <Route
          path={paths.home.path}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={paths.transactions.path}
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={paths.settings.path}
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={paths.categories.path}
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
