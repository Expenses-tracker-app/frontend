import React from 'react';
import Expense from '../../data/Expense';
import ExpenseItem from '../common/ExpenseItem';
import TotalBalanceItem from '../common/TotalBalanceItem';
import paths from '../../utilities/pathnames';

import { useTranslation } from 'react-i18next';
import { 
    styled, 
    Card, 
    Typography,
    Container,
    Button,
    Grid,
    Box,
    List
} from '@mui/material';

const Wrapper = styled(Container)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',    
    justifyContent: 'center',
    marginTop: '50px',    
    minHeight: '50vh',
  }));

const ContentContainer = styled(Box)(() => ({
    marginTop: '30px',
    maxWidth: '800px',
    width: '100%',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    background: theme.palette.secondary.main,
    borderRadius: '15px',
    marginBottom: '20px'
  }));

const StyledButton = styled(Button)(( ) => ({
    height: '100px',
    width: '100%',
}));


export const MyExpensesPage = () => {
    const { t } = useTranslation();

    const expenses = [
        new Expense('Spotify', 'April 10, 2023, 11:10', '20€'),
        new Expense('Spotify', 'April 10, 2023, 11:10', '20€'),
        new Expense('Spotify', 'April 10, 2023, 11:10', '20€'),
        new Expense('Spotify', 'April 10, 2023, 11:10', '20€'),
        new Expense('Spotify', 'April 10, 2023, 11:10', '20€'),
    ];

    const amount = '100€';
    const percentage = '+10%';


    return (
        <Wrapper>
            <Typography variant="h1">{t('myExpenses.title')}</Typography>            
            <ContentContainer> 

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <StyledCard>
                            <StyledButton variant="text" href={paths.newExpense.path}>
                                <Typography variant="h2">{t('myExpenses.addNew')}</Typography>
                            </StyledButton>
                        </StyledCard>
                    </Grid>

                    <Grid item xs={6}>
                        <StyledCard>
                            <TotalBalanceItem amount={amount} percentage={percentage}/>
                        </StyledCard>
                    </Grid>
                </Grid>
        
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <StyledCard>
                            <List>
                                {expenses.map((expense, index) => (
                                <ExpenseItem
                                    key={index}
                                    name={expense.name}
                                    timestamp={expense.timestamp}
                                    amount={expense.amount}
                                />
                                ))}
                            </List>
                        </StyledCard>
                    </Grid>
                </Grid>

            </ContentContainer>
      </Wrapper>
    );
  };