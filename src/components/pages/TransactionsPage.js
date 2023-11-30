import React, { useState, useEffect } from 'react';
import TransactionItem from '../common/TransactionItem';
import TotalBalanceItem from '../common/TotalBalanceItem';
import { useTranslation } from 'react-i18next';
import { styled, Card, Button, Typography, Container, Grid, Box, List } from '@mui/material';
import AddNewExpenseModal from '../modals/AddNewTransactionModal';
import EditTransactionModal from '../modals/EditTransactionModal';
import { getExpense, getIncome } from '../../services/apiService';
import { convertResponseToArray } from '../../utilities/helper';

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

const calculateTotal = (transactions) =>
  transactions.reduce((sum, transaction) => {
    const amount = Object.prototype.hasOwnProperty.call(transaction, 'expense_amount')
      ? transaction.expense_amount
      : transaction.income_amount;
    return sum + amount;
  }, 0);

const Title = styled(Typography)(() => ({
  fontWeight: '600',
  padding: '15px',
  fontSize: '18px'
}));

export const TransactionsPage = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [updateTransaction, setUpdateTransactions] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [expensesResponse, incomesResponse] = await Promise.all([getExpense(), getIncome()]);

        const expensesData =
          expensesResponse && expensesResponse.status !== 404
            ? convertResponseToArray(expensesResponse)
            : [];

        setExpenses(expensesData);

        const incomesData =
          incomesResponse && incomesResponse.status !== 404
            ? convertResponseToArray(incomesResponse)
            : [];
        setIncomes(incomesData);
        setTransactions([...expensesData, ...incomesData]);
      } catch (fetchError) {
        console.error(fetchError || 'Error fetching transactions');
      }
    };

    fetchTransactions();
  }, [updateTransaction]);

  const amount = calculateTotal(incomes) - calculateTotal(expenses);
  const percentage = calculateTotal(expenses)
    ? calculateTotal(incomes) / calculateTotal(expenses)
    : 0;

  const handleOpenEditModal = (transaction) => {
    setTransaction(transaction);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenAddModal(false);
    setUpdateTransactions((prev) => !prev);
  };

  return (
    <Wrapper>
      <Typography variant="h1">{t('transactions.title')}</Typography>
      <ContentContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MCard>
              <MButton variant="text" onClick={() => setOpenAddModal(true)}>
                <Typography variant="h2">{t('transactions.addNew')}</Typography>
              </MButton>
            </MCard>
          </Grid>

          {transaction !== null && (
            <EditTransactionModal
              open={openEditModal}
              onClose={handleCloseModal}
              transaction={transaction}
            />
          )}
          <AddNewExpenseModal open={openAddModal} onClose={handleCloseModal} />

          <Grid item xs={6}>
            <MCard>
              <TotalBalanceItem amount={amount} percentage={percentage} />
            </MCard>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MCard>
              <Title>{t('transactions.title')}</Title>
              <List>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => {
                    const isExpense = Object.prototype.hasOwnProperty.call(
                      transaction,
                      'expense_id'
                    );
                    const id = isExpense ? transaction.expense_id : transaction.income_id;
                    const desc = isExpense
                      ? transaction.expense_description
                      : transaction.income_description;
                    const date = isExpense ? transaction.expense_date : transaction.income_date;
                    const amount = isExpense
                      ? transaction.expense_amount
                      : transaction.income_amount;

                    return (
                      <TransactionItem
                        key={id}
                        desc={desc}
                        date={date}
                        amount={amount}
                        isExpense={isExpense}
                        onClick={() => handleOpenEditModal(transaction)}
                      />
                    );
                  })
                ) : (
                  <Typography>{t('transactions.noTransactions')}</Typography>
                )}
              </List>
            </MCard>
          </Grid>
        </Grid>
      </ContentContainer>
    </Wrapper>
  );
};
