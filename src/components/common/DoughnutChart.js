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
  const [doughnutData, setDoughnutData] = useState({
    labels: ['Incomes', 'Expenses'],
    datasets: [
      { backgroundColor: ['#39d49b', '#f00a0a'], borderColor: ['#39d49b', '#f00a0a'], data: [] }
    ]
  });

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

    const calculateTotal = (transactions) =>
      transactions.reduce(
        (acc, transaction) => acc + (transaction.expense_amount || transaction.income_amount),
        0
      );

    const processedExpenses = filterAndSortTransactions(expenses);
    const processedIncomes = filterAndSortTransactions(incomes);

    const expenseSum = calculateTotal(processedExpenses);
    const incomeSum = calculateTotal(processedIncomes);

    setDoughnutData((prevData) => ({
      ...prevData,
      datasets: [{ ...prevData.datasets[0], data: [incomeSum, expenseSum] }]
    }));
  }, [selectedDate, selectedCategory, expenses, incomes]);

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
