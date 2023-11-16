import React from 'react';
import ExpenseItem from '../common/TransactionItem';
import TotalBalanceItem from '../common/TotalBalanceItem';
import data from '../../data/data.json';
import { useTranslation } from 'react-i18next';
import { styled, Card, Typography, Container, Grid, Box, List } from '@mui/material';
import paths from '../../utilities/pathnames';
import MyButton from '../common/Button';

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

export const TransactionsPage = () => {
  const { t } = useTranslation();
  const expenses = data.expenses;
  const amount = '100.000.000€';
  const percentage = '+10%';

  return (
    <Wrapper>
      <Typography variant="h1">{t('transactions.title')}</Typography>
      <ContentContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MCard>
              <MyButton path={paths.newExpense.path} text={t('transactions.addNew')} />
            </MCard>
          </Grid>

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
                {expenses.map((expense, index) => (
                  <ExpenseItem
                    key={index}
                    desc={expense.desc}
                    date={expense.date}
                    amount={expense.amount}
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
