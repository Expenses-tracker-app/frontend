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
  const [expenseSum, setExpenseSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);

  const labels = useMemo(() => {
    return ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  }, []);

  const [lineData, setLineData] = useState({ labels, datasets: [] });

  const getTransactionDate = (transaction) => {
    return transaction.expense_date || transaction.income_date;
  };

  useEffect(() => {
    const groupAndSumByDate = (transactions) => {
      const groupedTransactions = {};

      transactions.forEach((transaction) => {
        const date = getTransactionDate(transaction).split('T')[0];
        if (!groupedTransactions[date]) {
          groupedTransactions[date] = {
            date,
            totalAmount: 0
          };
        }

        groupedTransactions[date].totalAmount +=
          transaction.expense_ampunt || transaction.income_amount;
      });

      return Object.values(groupedTransactions);
    };

    const sortByCategoryAndDate = (transactions) => {
      const processedData = transactions
        .filter((item) => {
          if (!selectedDate && !selectedCategory) {
            return processedData;
          } else {
            (!selectedDate ||
              (new Date(getTransactionDate(item)).getFullYear() === selectedDate.getFullYear() &&
                new Date(getTransactionDate(item)).getMonth() === selectedDate.getMonth())) &&
              (!selectedCategory || item.tag_id === selectedCategory);
          }
        })
        .sort((a, b) => new Date(getTransactionDate(b)) - new Date(getTransactionDate(a)));
      return processedData;
    };
    if (expenses.length !== 0 && incomes.length !== 0) {
      setExpenseSum(groupAndSumByDate(sortByCategoryAndDate(expenses)));
      setIncomeSum(groupAndSumByDate(sortByCategoryAndDate(incomes)));
    }
  }, [selectedDate, selectedCategory, expenses, incomes]);

  useEffect(() => {
    setLineData({
      labels: labels,
      datasets: [
        {
          label: 'Incomes',
          data: incomeSum,
          borderColor: '#39d49b',
          backgroundColor: '#39d49b'
        },
        {
          label: 'Expenses',
          data: expenseSum,
          borderColor: '#f00a0a',
          backgroundColor: '#f00a0a'
        }
      ]
    });
  }, [incomeSum, expenseSum, labels]);

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
