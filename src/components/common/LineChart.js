import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Grid, styled } from '@mui/material';
import { Line } from 'react-chartjs-2';
import DateProvider from '../layout/DateContext';
import PropTypes from 'prop-types';

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
    width: '95%',
    maxWidth: '480px'
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    padding: '2px'
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

const LineChart = ({ expenses, incomes }) => {
  const { selectedDate, selectedCategory } = useContext(DateProvider);
  const [lineData, setLineData] = useState({ labels: [], datasets: [] });

  const labels = useMemo(() => ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], []);

  const getTransactionDate = (transaction) => {
    return new Date(transaction.expense_date || transaction.income_date);
  };

  useEffect(() => {
    const filterAndSortTransactions = (transactions) => {
      return transactions
        .filter((transaction) => {
          const transactionDate = getTransactionDate(transaction);
          const isSelectedDate =
            transactionDate.getFullYear() === selectedDate.getFullYear() &&
            transactionDate.getMonth() === selectedDate.getMonth();
          return selectedCategory
            ? transaction.tag_id === selectedCategory && isSelectedDate
            : isSelectedDate;
        })
        .sort((a, b) => getTransactionDate(b) - getTransactionDate(a));
    };

    const groupAndSumByDate = (transactions) => {
      return transactions.reduce((acc, transaction) => {
        const amount = transaction.expense_amount || transaction.income_amount;
        acc[getTransactionDate(transaction)] = (acc[getTransactionDate(transaction)] || 0) + amount;
        return acc;
      }, {});
    };
    const processedExpenses = expenses.length ? filterAndSortTransactions(expenses) : [];
    const processedIncomes = incomes.length ? filterAndSortTransactions(incomes) : [];

    const expenseSum = groupAndSumByDate(processedExpenses);
    const incomeSum = groupAndSumByDate(processedIncomes);

    setLineData({
      labels,
      datasets: [
        {
          label: 'Incomes',
          data: Object.values(incomeSum),
          borderColor: '#39d49b',
          backgroundColor: '#39d49b'
        },
        {
          label: 'Expenses',
          data: Object.values(expenseSum),
          borderColor: '#f00a0a',
          backgroundColor: '#f00a0a'
        }
      ]
    });
  }, [selectedDate, selectedCategory, expenses, incomes, labels]);

  return (
    <Wrapper>
      <Line options={lineOptions} data={lineData} />
    </Wrapper>
  );
};

LineChart.propTypes = {
  expenses: PropTypes.array,
  incomes: PropTypes.array
};

export default LineChart;
