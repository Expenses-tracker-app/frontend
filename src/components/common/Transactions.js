import React from 'react';
import TransactionItem from './TransactionItem';
import data from '../../data/data.json';
import { useTranslation } from 'react-i18next';
import { styled, Typography, Grid, List } from '@mui/material';

const Wrapper = styled(Grid)(({ theme }) => ({
  justifyContent: 'space-between',
  width: '480px',
  background: theme.palette.grey[600],
  borderRadius: '35px',
  padding: '15px'
}));

const Title = styled(Typography)(() => ({
  fontWeight: '600',
  padding: '15px'
}));

export const Transactions = () => {
  const { t } = useTranslation();

  const combinedData = [...data.expenses, ...data.incomes];

  combinedData.sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateB - dateA;
  });

  return (
    <Wrapper>
      <Title variant="h5">{t('transactions.title')}</Title>
      <List>
        {combinedData.map((item, index) => (
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
