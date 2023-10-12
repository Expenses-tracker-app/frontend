import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
    styled, 
    Card, 
    Typography,
    Container,
    Button,
    ListItemButton,
    ListItemText, 
    Grid,
    Box
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
    marginBottom: '20px',
  }));

const StyledButton = styled(Button)(( ) => ({
    height: '100px',
    width: '100%',
}));

export const MyExpensesPage = () => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Typography variant="h1">{t('myExpenses.title')}</Typography>            
            <ContentContainer>                
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <StyledCard>
                            <StyledButton variant="text">{t('myExpenses.addNew')}</StyledButton>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={6}>
                        <StyledCard>
                            <StyledButton variant="text">{t('myExpenses.totalBalance')}</StyledButton>
                        </StyledCard>
                    </Grid>
                </Grid>
        
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <StyledCard>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="Spotify - 400€" />
                            </ListItemButton>
                        </StyledCard>
                    </Grid>
                </Grid>
            </ContentContainer>
      </Wrapper>
    );
  };