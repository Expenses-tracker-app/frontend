import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import paths from './utilities/pathnames';
import { MainPage } from './components/pages/MainPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { Layout } from './components/layout/Layout';
import { Providers } from './components/layout/Providers';

function App() {
  return (
    <>
      <BrowserRouter>
        <Providers>
          <Routes>
            <Route element={<Layout />}>
              <Route path={paths.home.path} element={<MainPage />} />
              <Route path={paths.profile.path} element={<ProfilePage />} />
              <Route path={paths.transactions.path} element={<TransactionsPage />} />
            </Route>
          </Routes>
        </Providers>
      </BrowserRouter>
    </>
  );
}

export default App;
