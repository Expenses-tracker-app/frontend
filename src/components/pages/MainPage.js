import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, styled, Typography, Container } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import LineChart from '../common/LineChart';
import { MCalendar } from '../common/Calendar';
import DoughnutChart from '../common/DoughnutChart';
import Transactions from '../common/Transactions';
import { Link } from 'react-router-dom';
import paths from '../../utilities/pathnames';
import ActionButtons from '../common/ActionButtons';
import { getExpense, getIncome } from '../../services/apiService';
import { convertResponseToArray } from '../../utilities/helper';
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
    width: '100%',
    justifyContent: 'center'
  },
  [`> div`]: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '40px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      justifyContent: 'center'
    }
  }
}));

const Box = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%'
  }
}));

const MBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '-270px',
  [theme.breakpoints.down('md')]: {
    margin: 'auto',
    width: '100%',
    justifyContent: 'center'
  }
}));

const Greeting = styled(Typography)(() => ({
  fontWeight: 500
}));

const Welcome = styled(Typography)(() => ({
  fontWeight: 200
}));

const MTitle = styled(Container)(() => ({
  margin: 'auto',
  justifyContent: 'center',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column'
}));

const MLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  [theme.breakpoints.down('md')]: {
    margin: 'auto',
    width: '100%',
    justifyContent: 'center'
  }
}));

export const MainPage = () => {
  const { t } = useTranslation();
  const [greeting, setGreeting] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [expensesResponse, incomesResponse] = await Promise.all([getExpense(), getIncome()]);

        if (expensesResponse.status === 404 || incomesResponse.status === 404) {
          console.error('Error fetching transactions: status code 404');
        }

        const expensesData =
          expensesResponse && expensesResponse.status !== 404
            ? convertResponseToArray(expensesResponse)
            : [];
        setExpenses(expensesData);

        const incomesData =
          incomesResponse && incomesResponse.status !== 404
            ? convertResponseToArray(incomesResponse)
            : [];

        setIncomes(incomesData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Wrapper>
      <MTitle>
        <Greeting variant="h1">{greeting}</Greeting>
        <Welcome variant="h3">{t('specific.welcome')}</Welcome>
      </MTitle>
      <div>
        <LineChart expenses={expenses} incomes={incomes} />
        <Box>
          <MCalendar />
          <DoughnutChart expenses={expenses} incomes={incomes} />
        </Box>
        <MBox>
          <ActionButtons />
          <MLink to={paths.transactions.path}>
            <Transactions expenses={expenses} incomes={incomes} />
          </MLink>
        </MBox>
      </div>
    </Wrapper>
  );
};
