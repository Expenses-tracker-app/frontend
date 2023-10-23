import React from 'react';
import { Grid, styled } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import { MCalendar } from '../../components/common/Calendar';
import '../../styles/calendarStyles.css';

// Styles
const Wrapper = styled(Grid)(({ theme }) => ({
  padding: '0px 14px 0px 10px',
  height: '50px',
  boxShadow: theme.shadows[2],
  justifyContent: 'space-between',
  color: theme.palette.primary.main,
  borderRadius: '20px'
}));

export const LandingPage = () => {
  return (
    <>
      <Wrapper>
        <MCalendar />
      </Wrapper>
    </>
  );
};
