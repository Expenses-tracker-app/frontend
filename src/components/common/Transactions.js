import React from 'react';
import ExpenseItem from '../common/ExpenseItem';
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
  const expenses = data.expenses;

  return (
    <Wrapper>
      <Title variant="h5">{t('transactions.title')}</Title>
      <List>
        {expenses.map((expense, index) => (
          <ExpenseItem
            key={index}
            desc={expense.desc}
            date={expense.date}
            amount={expense.amount}
          />
        ))}
      </List>
    </Wrapper>
  );
};
