import React, { useState, useEffect } from 'react';
import ExpenseItem from '../common/TransactionItem';
import TotalBalanceItem from '../common/TotalBalanceItem';
import { useTranslation } from 'react-i18next';
import { styled, Card, Button, Typography, Container, Grid, Box, List } from '@mui/material';
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
        // Replace 'userId' with the actual user ID or a variable holding the user ID
        const userId = '123';
        const expenses = await getExpense({ id: userId });
        calculateTotal(expenses.data, setTotalExpenses);

        const incomes = await getIncome({ id: userId });
        calculateTotal(incomes.data, setTotalIncomes);

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
                {transactions.map((transaction, index) => (
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
