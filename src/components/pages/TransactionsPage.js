import React, { useState, useEffect } from 'react';
import ExpenseItem from '../common/TransactionItem';
import TotalBalanceItem from '../common/TotalBalanceItem';
import { useTranslation } from 'react-i18next';
import {
  styled,
  Card,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  List,
  Alert as MuiAlert
} from '@mui/material';
import AddNewExpenseModal from '../modals/AddNewTransactionModal';
import { getExpense, getIncome } from '../../services/apiService';

const Wrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '50px',
  minHeight: '50vh'
}));

const ContentContainer = styled(Box)(() => ({
  marginTop: '30px',
  maxWidth: '800px',
  width: '100%'
}));

const MCard = styled(Card)(({ theme }) => ({
  background: theme.palette.grey[600],
  borderRadius: '35px',
  marginBottom: '20px'
}));

const MButton = styled(Button)(() => ({
  height: '120px',
  width: '100%'
}));

export const TransactionsPage = () => {
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const { t } = useTranslation();

  const calculateTotal = (transactions, setTotal) => {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    setTotal(total);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setError(null);
        const expenses = await getExpense();
        if (expenses.data !== undefined) {
          calculateTotal(expenses.data, setTotalExpenses);
        } else {
          console.log('No expenses received from the server.');
        }

        const incomes = await getIncome();
        if (incomes.data !== undefined) {
          calculateTotal(incomes.data, setTotalIncomes);
        } else {
          console.log('No expenses received from the server.');
        }

        const allTransactions = [...expenses.data, ...incomes.data];
        setTransactions(allTransactions);

      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const amount = totalIncomes - totalExpenses;
  const percentage = totalIncomes / totalExpenses;

  return (
    <Wrapper>
      <Typography variant="h1">{t('transactions.title')}</Typography>
      <ContentContainer>
        {error && (
          <MuiAlert severity="error" sx={{ marginTop: 2 }} variant="filled">
            {error}
          </MuiAlert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MCard>
              <MButton variant="text" onClick={handleOpenModal}>
                <Typography variant="h2">{t('transactions.addNew')}</Typography>
              </MButton>
            </MCard>
          </Grid>

          <AddNewExpenseModal open={openModal} onClose={handleCloseModal} />

          <Grid item xs={6}>
            <MCard>
              <TotalBalanceItem amount={amount} percentage={percentage} />
            </MCard>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MCard>
              <List>
                {transactions &&
                  transactions.map((transaction, index) => (
                    <ExpenseItem
                      key={index}
                      desc={transaction.desc}
                      date={transaction.date}
                      amount={transaction.amount}
                    />
                  ))}
              </List>
            </MCard>
          </Grid>
        </Grid>
      </ContentContainer>
    </Wrapper>
  );
};
