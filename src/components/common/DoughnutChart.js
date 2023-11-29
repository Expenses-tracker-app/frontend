import React, { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid, styled } from '@mui/material';
import { ArcElement } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
import DateProvider from '../layout/DateContext';
import { getExpense, getIncome } from '../../services/apiService';
import { convertResponseToArray } from '../../utilities/helper';
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

  useEffect(() => {
    const fetchAndProcessTransactions = async (fetchFunction, setTransactions) => {
      try {
        const response = await fetchFunction();
        if (response.status === 404) {
          console.log(response.message);
          return;
        }

        const responseArray = convertResponseToArray(response);

        let transactions =
          responseArray.sort(
            (a, b) => new Date(getTransactionDate(b)) - new Date(getTransactionDate(a))
          ) || [];
        transactions = filterTransactions(transactions);
        const groupedTransactions = groupAndSumByDate(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const getTransactionDate = (transaction) => {
      return transaction.expense_date || transaction.income_date;
    };

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

    const filterTransactions = (transactions) => {
      return transactions.filter((transaction) => {
        const transactionDate = new Date(getTransactionDate(transaction).split('T')[0]);
        const isDateMatch = selectedDate
          ? transactionDate.toDateString() === selectedDate.toDateString()
          : true;
        const isCategoryMatch = selectedCategory ? transaction.tag_id === selectedCategory : true;
        return isDateMatch && isCategoryMatch;
      });
    };

    const fetchData = async () => {
      await fetchAndProcessTransactions(getExpense, setExpenses);
      await fetchAndProcessTransactions(getIncome, setIncomes);
    };

    fetchData();
  }, [selectedDate, selectedCategory]);

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
          data: [calculateTotal(incomes), calculateTotal(expenses)]
        }
      ]
    }));
  }, [incomes, expenses]);

  const calculateTotal = (transactions) =>
    transactions.reduce((acc, transaction) => acc + transaction.totalAmount, 0);

  return (
    <Wrapper>
      <Doughnut data={doughnutData} options={doughnutOptions} />
    </Wrapper>
  );
};
