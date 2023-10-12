import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
    styled, 
    Card, 
    Typography,
    Container,
    Button,
    ListItemButton,
    ListItemText 
} from '@mui/material';


const Wrapper = styled(Container)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px'
  }));

const StyledCard = styled(Card)(({ theme }) => ({
    background: theme.palette.secondary.main,
    borderRadius: '15px',
    marginBottom: '20px',
  }));

export const MyExpensesPage = () => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Typography variant="h1">{t('myExpenses.title')}</Typography>

            <StyledCard>
                <Button variant="text">{t('myExpenses.addNew')}</Button>
            </StyledCard>
    
            <StyledCard>
                <Button variant="text">{t('myExpenses.totalBalance')}</Button>
            </StyledCard>
    
            <StyledCard>
                <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary="Spotify - 400€" />
                </ListItemButton>
            </StyledCard>
      </Wrapper>
    );
  };