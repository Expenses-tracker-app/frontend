import React, { useEffect, useContext, useState } from 'react';
import TransactionItem from './TransactionItem';
import { useTranslation } from 'react-i18next';
import { styled, Typography, Grid, List } from '@mui/material';
import DateProvider from '../layout/DateContext';
import PropTypes from 'prop-types';

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
    width: '95%',
    justifyContent: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    with: '95%',
    margin: 'auto'
  }
}));

const Title = styled(Typography)(() => ({
  fontWeight: '600',
  padding: '15px',
  fontSize: '18px'
}));

const Transactions = ({ expenses, incomes }) => {
  const { t } = useTranslation();
  const { selectedDate, selectedCategory } = useContext(DateProvider);
  const [filteredData, setFilteredData] = useState([]);

  const getTransactionDate = (transaction) => {
    return new Date(transaction.expense_date || transaction.income_date);
  };

  useEffect(() => {
    const filterAndSortTransactions = () => {
      return [...expenses, ...incomes]
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

    setFilteredData(filterAndSortTransactions());
  }, [selectedDate, selectedCategory, expenses, incomes]);

  return (
    <Wrapper>
      <Title>{t('transactions.title')}</Title>
      <List>
        {filteredData.length > 0 ? (
          filteredData.map((transaction) => {
            const isExpense = 'expense_id' in transaction;
            const id = isExpense ? transaction.expense_id : transaction.income_id;
            const desc = isExpense
              ? transaction.expense_description
              : transaction.income_description;
            const date = getTransactionDate(transaction).toLocaleDateString();
            const amount = isExpense ? transaction.expense_amount : transaction.income_amount;

            return (
              <TransactionItem
                key={id}
                desc={desc}
                date={date}
                amount={amount}
                isExpense={isExpense}
              />
            );
          })
        ) : (
          <Typography>{t('transactions.noTransactions')}</Typography>
        )}
      </List>
    </Wrapper>
  );
};

Transactions.propTypes = {
  expenses: PropTypes.array,
  incomes: PropTypes.array
};

export default Transactions;
