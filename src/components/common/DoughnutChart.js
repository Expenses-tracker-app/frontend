import React, { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid, styled } from '@mui/material';
import { ArcElement } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
import DateProvider from '../layout/DateContext';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement);

const Wrapper = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '5px 25px 25px 25px',
  width: '300px',
  height: '260px',
  borderRadius: '30px',
  margin: '5px',
  backgroundColor: theme.palette.grey[600],
  [theme.breakpoints.down('md')]: {
    height: '240px',
    width: '240px'
  },
  [theme.breakpoints.down('sm')]: {
    height: '200px',
    width: '45%',
    maxWidth: '235px',
    marginLeft: '2.5px'
  }
}));

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'top',
      align: 'start',
      labels: {
        color: 'white',
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 10,
          family: 'Montserrat'
        },
        padding: 20
      }
    }
  },
  scale: 70
};

const DoughnutChart = ({ expenses, incomes }) => {
  const { selectedDate, selectedCategory } = useContext(DateProvider);
  const [expenseSum, setExpenseSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);

  const getTransactionDate = (transaction) => {
    return transaction.expense_date || transaction.income_date;
  };

  const calculateTotal = (transactions) =>
    transactions.reduce((acc, transaction) => acc + transaction.totalAmount, 0);

  useEffect(() => {
    console.log('Doughnutchart:', expenses);

    const sortByCategoryAndDate = (transactions) => {
      const today = new Date();
      const processedData = transactions
        .filter((item) => {
          if (!selectedDate && !selectedCategory) {
            const transactionDate = new Date(getTransactionDate(item));
            return transactionDate.toDateString() === today.toDateString();
          } else {
            (!selectedDate ||
              new Date(getTransactionDate(item)).toDateString() === selectedDate.toDateString()) &&
              (!selectedCategory || item.tag_id === selectedCategory);
          }
        })
        .sort((a, b) => new Date(getTransactionDate(b)) - new Date(getTransactionDate(a)));
      return processedData;
    };

    if (expenses.length !== 0 && incomes.length !== 0) {
      setExpenseSum(calculateTotal(sortByCategoryAndDate(expenses)));
      setIncomeSum(calculateTotal(sortByCategoryAndDate(incomes)));
    }
  }, [selectedDate, selectedCategory, expenses, incomes]);

  const [doughnutData, setDoughnutData] = useState({
    labels: ['Incomes', 'Expenses'],
    datasets: [
      {
        backgroundColor: ['#39d49b', '#f00a0a'],
        borderColor: ['#39d49b', '#f00a0a']
      }
    ]
  });

  useEffect(() => {
    setDoughnutData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: [expenseSum, incomeSum]
        }
      ]
    }));
  }, [incomeSum, expenseSum]);

  return (
    <Wrapper>
      <Doughnut data={doughnutData} options={doughnutOptions} />
    </Wrapper>
  );
};

DoughnutChart.propTypes = {
  expenses: PropTypes.array,
  incomes: PropTypes.array
};

export default DoughnutChart;
