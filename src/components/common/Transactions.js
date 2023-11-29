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

const Transactions = ({ expenses, incomes }) => {
  const { t } = useTranslation();
  const { selectedDate, selectedCategory } = useContext(DateProvider);
  const [filteredData, setFilteredData] = useState([]);

  // Utility function to extract the correct date field
  const getTransactionDate = (transaction) => {
    return transaction.expense_date || transaction.income_date;
  };

  useEffect(() => {
    const sortByCategoryAndDate = () => {
      const today = new Date();
      const processedData = [...expenses, ...incomes]
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

    setFilteredData(sortByCategoryAndDate);
  }, [selectedDate, selectedCategory, expenses, incomes]);

  return (
    <Wrapper>
      <Title>{t('transactions.title')}</Title>
      <List>
        {filteredData.length > 0 ? (
          filteredData.map((transaction) => {
            const isExpense = Object.prototype.hasOwnProperty.call(transaction, 'expense_id');
            const id = isExpense ? transaction.expense_id : transaction.income_id;
            const desc = isExpense
              ? transaction.expense_description
              : transaction.income_description;
            const date = isExpense ? transaction.expense_date : transaction.income_date;
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
  expenses: PropTypes.object,
  incomes: PropTypes.object
};

export default Transactions;
