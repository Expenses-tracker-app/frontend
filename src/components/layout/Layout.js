import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/header';
import { LayoutContainer } from './LayoutStyles';

export const Layout = () => {
  return (
    <>
      <LayoutContainer>
        <Header />
        <Outlet />
      </LayoutContainer>
    </>
  );
};
