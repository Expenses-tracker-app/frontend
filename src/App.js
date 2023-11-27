import { React } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Providers } from './components/layout/Providers';

function App() {
  return (
    <>
      <BrowserRouter basename="/frontend">
        <Providers>
          <AppRoutes />
        </Providers>
      </BrowserRouter>
    </>
  );
}

export default App;
