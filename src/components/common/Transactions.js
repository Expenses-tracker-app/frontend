import React, { useEffect, useContext, useState } from 'react';
import TransactionItem from './TransactionItem';
import { useTranslation } from 'react-i18next';
import { styled, Typography, Grid, List } from '@mui/material';
import DateProvider from '../layout/DataContext';
import { getExpense } from '../../services/apiService';

const Wrapper = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  width: '480px',
  background: theme.palette.grey[600],
  borderRadius: '35px',
  padding: '15px',
  margin: '5px',
  [theme.breakpoints.down('md')]: {
    margin: '5px auto auto auto',
    maxWidth: '480px',
    width: '98%',
    justifyContent: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    with: '100%',
    margin: 'auto'
  }
}));

const Title = styled(Typography)(() => ({
  fontWeight: '600',
  padding: '15px',
  fontSize: '18px'
}));

export const Transactions = () => {
  const { t } = useTranslation();
  const { selectedDate } = useContext(DateProvider);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = '123';
        const response = await getExpense({ id: userId });
        const combinedData = response.data;

        if (selectedDate) {
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
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [selectedDate]);

  return (
    <Wrapper>
      <Title>{t('transactions.title')}</Title>
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
