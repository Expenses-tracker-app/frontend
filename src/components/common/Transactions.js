import React, { useEffect, useContext, useState } from 'react';
import TransactionItem from './TransactionItem';
import { useTranslation } from 'react-i18next';
import { styled, Typography, Grid, List } from '@mui/material';
import DateProvider from '../layout/DateContext';
import { getExpense, getIncome } from '../../services/apiService';
import { convertResponseToArray } from '../../utilities/helper';

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

  // Utility function to extract the correct date field
  const getTransactionDate = (transaction) => {
    return transaction.expense_date || transaction.income_date;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [expensesResponse, incomesResponse] = await Promise.all([getExpense(), getIncome()]);

        const expensesData =
          expensesResponse && expensesResponse.status !== 404
            ? convertResponseToArray(expensesResponse)
            : [];

        const incomesData =
          incomesResponse && incomesResponse.status !== 404
            ? convertResponseToArray(incomesResponse)
            : [];

        const combinedData = [...expensesData, ...incomesData];
        const processedData = combinedData
          .filter(
            (item) =>
              !selectedDate ||
              new Date(getTransactionDate(item)).toDateString() === selectedDate.toDateString()
          )
          .sort((a, b) => new Date(getTransactionDate(b)) - new Date(getTransactionDate(a)));
        setFilteredData(processedData);
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
