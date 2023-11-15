import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import paths from './utilities/pathnames';
import { MainPage } from './components/pages/MainPage';
import { LoginPage } from './components/pages/LoginPage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { Layout } from './components/layout/Layout';
import { Providers } from './components/layout/Providers';
import {SettingsPage} from './components/pages/SettingsPage';
import {RegistrationPage} from './components/pages/RegistrationPage';
import {NotFoundPage} from './components/pages/NotFoundPage';
import {TagsPage} from './components/pages/TagsPage';
import { NewExpensePage } from './components/pages/NewExpense';
import {NavigationPage} from './components/pages/NavigationPage';

function App() {
  return (
    <>
      <BrowserRouter  basename="/frontend">
        <Providers>
          <Routes>
            <Route element={<Layout />}>
              <Route path={paths.home.path} element={<MainPage />} />
              <Route path={paths.login.path} element={<LoginPage />} />
              <Route path={paths.transactions.path} element={<TransactionsPage />} />
              <Route path={paths.settings.path} element={<SettingsPage />} />
              <Route path={paths.registration.path} element={<RegistrationPage />} />
              <Route path={paths.tags.path} element={<TagsPage />} />
              <Route path={paths.newExpense.path} element ={<NewExpensePage/>} />
              <Route path={paths.navigation.path} element = {<NavigationPage/>} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Providers>
      </BrowserRouter>
    </>
  );
}

export default App;
