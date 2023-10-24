import React from 'react';
import { Grid, styled } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import { LineChart } from '../common/LineChart';
import { MCalendar } from '../../components/common/Calendar';
import { DoughnutChart } from '../common/DoughnutChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Styles
const Wrapper = styled(Grid)(() => ({
  display: 'block',
  width: '80%',
  margin: 'auto',
  justifyContent: 'center',
  ' > div': {
    width: 'fit-content',
    display: 'flex',
    margin: 'auto',
    '> div': {
      margin: '10px'
    }
  }
}));

export const LandingPage = () => {
  return (
    <>
      <Wrapper>
        <div>
          <LineChart />
          <MCalendar />
        </div>
        <div>
          <DoughnutChart />
        </div>
      </Wrapper>
    </>
  );
};
