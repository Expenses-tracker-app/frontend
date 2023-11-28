import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Grid, styled } from '@mui/material';
import { Line } from 'react-chartjs-2';
import DateProvider from '../layout/DateContext';
import { getExpense, getIncome } from '../../services/apiService';
import { convertResponseToArray } from '../../utilities/helper';

const Wrapper = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '15px',
  width: '480px',
  height: '240px',
  borderRadius: '30px',
  margin: '5px',
  backgroundColor: theme.palette.grey[600],
  [theme.breakpoints.down('md')]: {
    margin: 'auto auto 5px auto',
    padding: '10px',
    width: '100%',
    maxWidth: '480px'
  },
  [theme.breakpoints.down('sm')]: {
    width: '98%',
    margin: 'auto'
  }
}));

export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white',
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 10,
          family: 'Montserrat'
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'transparent'
      },
      ticks: {
        color: 'white',
        font: {
          size: 9,
          family: 'Montserrat'
        }
      }
    },
    y: {
      grid: {
        color: 'transparent'
      },
      beginAtZero: true,
      ticks: {
        color: 'white',
        font: {
          size: 9,
          family: 'Montserrat'
        }
      }
    }
  }
};

export function LineChart() {
  const { selectedDate, selectedCategory } = useContext(DateProvider);
  const [lineData, setLineData] = useState({ labels: [], datasets: [] });

  const [transactions, setTransactions] = useState({ expenses: [], incomes: [] });
  const isCurrentDate = selectedDate.toDateString() === new Date().toDateString();
  const labels = useMemo(
    () =>
      isCurrentDate
        ? ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
        : ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    [isCurrentDate]
  );

  useEffect(() => {
    const getTransactionDate = (transaction) => {
      return transaction.expense_date || transaction.income_date;
    };

    const processTransactions = (data) => {
      return data
        .filter((trx) => !selectedCategory || trx.tag_id === selectedCategory)
        .sort((a, b) => new Date(getTransactionDate(b)) - new Date(getTransactionDate(a)))
        .reduce((acc, trx) => {
          const date = getTransactionDate(trx).split('T')[0];
          if (!acc[date]) {
            acc[date] = { date, totalAmount: 0 };
          }
          acc[date].totalAmount += trx.expense_amount || trx.income_amount;
          return acc;
        }, {});
    };

    const fetchTransactions = async () => {
      try {
        const [expensesResponse, incomesResponse] = await Promise.all([getExpense(), getIncome()]);

        const expensesData =
          expensesResponse.status !== 404 ? convertResponseToArray(expensesResponse) : [];
        const incomesData =
          incomesResponse.status !== 404 ? convertResponseToArray(incomesResponse) : [];

        setTransactions({
          expenses: Object.values(processTransactions(expensesData)),
          incomes: Object.values(processTransactions(incomesData))
        });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [selectedCategory, selectedDate]);

  useEffect(() => {
    setLineData({
      labels,
      datasets: [
        {
          label: 'Incomes',
          data: transactions.incomes,
          borderColor: '#39d49b',
          backgroundColor: '#39d49b'
        },
        {
          label: 'Expenses',
          data: transactions.expenses,
          borderColor: '#f00a0a',
          backgroundColor: '#f00a0a'
        }
      ]
    });
  }, [transactions, labels]);

  return (
    <Wrapper>
      <Line options={lineOptions} data={lineData} />
    </Wrapper>
  );
}
