import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/header';
import { LayoutContainer, LowerLeftWave, UpperRightWave } from './LayoutStyles';

export const Layout = () => {
  return (
    <>
      <LayoutContainer>
        <LowerLeftWave size="200px" />
        <UpperRightWave size="200px"/>
        <Header />
        <Outlet />
      </LayoutContainer>
    </>
  );
};
