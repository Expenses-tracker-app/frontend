import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/header';
import { LayoutContainer, LowerLeftWave, UpperRightWave } from './LayoutStyles';
import { DateProvider } from './DataContext';
import purpleWaveImage from '../../assets/wave.png'; // Replace with the actual path to your wave image

export const Layout = () => {
  return (
    <DateProvider>
      <LayoutContainer>
        <UpperRightWave src={purpleWaveImage} size="200px" />
        <Header />
        <Outlet />
        <LowerLeftWave src={purpleWaveImage} size="200px" />
      </LayoutContainer>
    </DateProvider>
  );
};
