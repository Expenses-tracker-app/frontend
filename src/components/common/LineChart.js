import React, { useContext, useState, useEffect } from 'react';
import { Grid, styled } from '@mui/material';
import { Line } from 'react-chartjs-2';
import DateProvider from '../layout/DataContext';
import { getExpense, getIncome } from '../../services/apiService';

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
  const { selectedDate } = useContext(DateProvider);

  const [lineData, setLineData] = useState({ labels: [], datasets: [] });
  const [length, setLength] = useState(12);
  const [labels, setLabels] = useState([
    'J',
    'F',
    'M',
    'A',
    'M',
    'J',
    'J',
    'A',
    'S',
    'O',
    'N',
    'D'
  ]);

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const expensesResponse = await getExpense();
        const sortedExpenses = expensesResponse.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const groupedExpenses = groupAndSumByDate(sortedExpenses);
        setExpenses(groupedExpenses);

        const incomesResponse = await getIncome();
        const sortedIncomes = incomesResponse.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const groupedIncomes = groupAndSumByDate(sortedIncomes);
        setIncomes(groupedIncomes);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const groupAndSumByDate = (transactions) => {
    const groupedTransactions = {};

    transactions.forEach((transaction) => {
      const date = transaction.date.split('T')[0];
      if (!groupedTransactions[date]) {
        groupedTransactions[date] = {
          date,
          totalAmount: 0
        };
      }

      groupedTransactions[date].totalAmount += transaction.amount;
    });

    return Object.values(groupedTransactions);
  };

  useEffect(() => {
    setLineData({
      labels,
      datasets: [
        {
          label: 'Incomes',
          data: incomes,
          borderColor: '#39d49b',
          backgroundColor: '#39d49b'
        },
        {
          label: 'Expenses',
          data: expenses,
          borderColor: '#f00a0a',
          backgroundColor: '#f00a0a'
        }
      ]
    });
  }, [length, labels]);

  useEffect(() => {
    if (selectedDate.toDateString() !== new Date().toDateString()) {
      setLength(7);
      setLabels(['M', 'T', 'W', 'T', 'F', 'S', 'S']);
      console.log(selectedDate);
    }
  }, [selectedDate]);

  return (
    <Wrapper>
      <Line options={lineOptions} data={lineData} />
    </Wrapper>
  );
}
