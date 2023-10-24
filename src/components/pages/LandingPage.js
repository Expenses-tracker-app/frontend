import React from 'react';
import { Grid, styled } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import { LineChart } from '../common/LineChart';
import { MCalendar } from '../../components/common/Calendar';

// Styles
const Wrapper = styled(Grid)(() => ({
  display: 'flex',
  width: '80%',
  margin: 'auto',
  justifyContent: 'center',
  ' > div': {
    margin: '10px'
  }
}));

export const LandingPage = () => {
  return (
    <>
      <Wrapper>
        <LineChart />
        <MCalendar />
      </Wrapper>
    </>
  );
};
