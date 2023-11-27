import React, { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid, styled } from '@mui/material';
import { ArcElement } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
import DateProvider from '../layout/DateContext';
import { getExpense, getIncome } from '../../services/apiService';
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
    width: '49%',
    maxWidth: '235px',
    marginLeft: '5px'
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

export const DoughnutChart = () => {
  const { selectedDate, selectedCategory } = useContext(DateProvider);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState();
  const [filteredIncomes, setFilteredIncomes] = useState();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const expensesResponse = await getExpense();
        setFilteredExpenses(
          expensesResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        );

        if (selectedCategory) {
          setFilteredExpenses(
            filteredExpenses.filter((expense) => expense.tag_id === selectedCategory)
          );
        }
        const groupedExpenses = groupAndSumByDate(filteredExpenses);
        setExpenses(groupedExpenses);

        const incomesResponse = await getIncome();
        setFilteredIncomes(
          incomesResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        );

        if (selectedCategory) {
          setFilteredIncomes(
            filteredIncomes.filter((income) => income.tag_id === selectedCategory)
          );
        }
        const groupedIncomes = groupAndSumByDate(filteredIncomes);
        setIncomes(groupedIncomes);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [selectedCategory, filteredExpenses, filteredIncomes]);

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
          data: [incomes, expenses],
          backgroundColor: ['#39d49b', '#f00a0a'],
          borderColor: ['#39d49b', '#f00a0a']
        }
      ]
    }));
  }, [selectedDate, incomes, expenses]);

  return (
    <Wrapper>
      <Doughnut data={doughnutData} options={doughnutOptions} />
    </Wrapper>
  );
};
