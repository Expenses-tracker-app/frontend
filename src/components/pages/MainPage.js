import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, styled, Typography } from '@mui/material';
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
const Wrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '800px',
  margin: 'auto',
  justifyContent: 'center',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  },
  [`> div`]: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

const Box = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto'
  }
}));

const Greeting = styled(Typography)(() => ({
  fontWeight: 500
}));

const Welcome = styled(Typography)(() => ({
  fontWeight: 200
}));

const MTitle = styled('div')(() => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column'
}));

const MLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  marginTop: '-270px',
  [theme.breakpoints.down('md')]: {
    margin: 'auto'
  }
}));

export const MainPage = () => {
  const { t } = useTranslation();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentTime = new Date().getHours();
    let newGreeting = '';

    if (currentTime >= 5 && currentTime < 12) {
      newGreeting = 'Good morning';
    } else if (currentTime >= 12 && currentTime < 17) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }

    setGreeting(newGreeting);
  }, []);

  return (
    <Wrapper>
      <MTitle>
        <Greeting variant="h1">{greeting}</Greeting>
        <Welcome variant="h3">{t('specific.welcome')}</Welcome>
      </MTitle>
      <div>
        <LineChart />
        <Box>
          <MCalendar />
          <DoughnutChart />
        </Box>
        <MLink to={paths.transactions.path}>
          <Transactions />
        </MLink>
      </div>
    </Wrapper>
  );
};
