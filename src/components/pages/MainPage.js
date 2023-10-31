import React from 'react';
import { Grid, styled } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import { LineChart } from '../common/LineChart';
import { MCalendar } from '../common/Calendar';
import { DoughnutChart } from '../common/DoughnutChart';
import { Transactions } from '../common/Transactions';
import { Link } from 'react-router-dom';
import paths from '../../utilities/pathnames';
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
  [`> div`]: {
    width: 'fit-content',
    display: 'flex',
    margin: 'auto',
    [`> *`]: {
      margin: '10px'
    }
  }
}));

const MLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

export const MainPage = () => {
  return (
    <Wrapper>
      <div>
        <LineChart />
        <MCalendar />
      </div>
      <div>
        <MLink to={paths.transactions.path}>
          <Transactions />
        </MLink>
        <DoughnutChart />
      </div>
    </Wrapper>
  );
};
