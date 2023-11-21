import React, { useEffect, useContext, useState } from 'react';
import TransactionItem from './TransactionItem';
import data from '../../data/data.json';
import { useTranslation } from 'react-i18next';
import { styled, Typography, Grid, List } from '@mui/material';
import DateProvider from '../layout/DataContext';

const Wrapper = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  width: '480px',
  background: theme.palette.grey[600],
  borderRadius: '35px',
  padding: '15px',
  margin: '5px',
  [theme.breakpoints.down('md')]: {
    margin: 'auto',
    maxWidth: '480px',
    width: '90%',
    justifyContent: 'center'
  }
}));

const Title = styled(Typography)(() => ({
  fontWeight: '600',
  padding: '15px'
}));

export const Transactions = () => {
  const { t } = useTranslation();
  const { selectedDate } = useContext(DateProvider);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();

    const combinedData = [...data.expenses, ...data.incomes];

    if (selectedDate.toDateString() !== currentDate.toDateString()) {
      const filteredTransactions = combinedData.filter((item) => {
        const itemDate = new Date(item.date.split('-').reverse().join('-'));
        return itemDate.toDateString() === selectedDate.toDateString();
      });

      filteredTransactions.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateB - dateA;
      });

      setFilteredData(filteredTransactions);
    } else {
      combinedData.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateB - dateA;
      });

      setFilteredData(combinedData);
    }
  }, [selectedDate]);

  return (
    <Wrapper>
      <Title variant="h5">{t('transactions.title')}</Title>
      <List>
        {filteredData.map((item, index) => (
          <TransactionItem
            key={index}
            desc={item.desc}
            date={item.date}
            amount={item.amount}
            isExpense={item.expense_id !== undefined}
          />
        ))}
      </List>
    </Wrapper>
  );
};
