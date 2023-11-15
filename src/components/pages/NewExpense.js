import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  Grid,
  styled,
  FormLabel,
  Input,
  FormGroup,
  Typography
} from '@mui/material';
//import paths from '../../utilities/pathnames';

// Styles
const Wrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px'
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
  marginTop: '30px',
  padding: '50px',
  width: '50%',
  boxShadow: theme.shadows[2],
  color: theme.palette.primary.main,
  background: theme.palette.grey[600],
  borderRadius: 25
}));

const InputLine = styled(Input)(({ theme }) => ({
  padding: '10px 14px 10px 14px',
  color: theme.palette.primary.main,
  background: theme.palette.secondary.main,
  margin: '10px 0 50px 0'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.blue,
  borderRadius: 25,
  width: '30%',
  padding: '7px 0px 7px 0px',
  margin: 'auto',
  '&:hover': {
    background: theme.palette.primary.blue
  }
}));

export const NewExpensePage = () => {
  const { t } = useTranslation();

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDesciption] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleCategoryChange = (category) => {
    setCategory(category.target.value);
  };

  const handleAmountChange = (amount) => {
    setAmount(amount.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date.target.value);
  };

  const handleDescriptionChange = (description) => {
    setDesciption(description.target.value);
  };

  const handleSubmit = () => {
    const newExpense = {
      name: description,
      date: date,
      amount: amount
    };
    setExpenses(expenses.concat(newExpense));
    localStorage.setItem('expense', JSON.stringify(expenses));
    setCategory('');
    setAmount('');
    setDate('');
    setDesciption('');
    console.log(expenses);
  };

  return (
    <Wrapper>
      <Typography variant="h1">{t('newExpense.title')}</Typography>
      <FormWrapper>
        <FormGroup>
          <FormLabel>
            <Typography variant="h6">{t('newExpense.category')}</Typography>
          </FormLabel>
          <InputLine id="new_cat" value={category} onChange={handleCategoryChange} />
          <FormLabel>
            <Typography variant="h6">{t('newExpense.amount')} </Typography>
          </FormLabel>
          <InputLine id="amount" value={amount} onChange={handleAmountChange} />
          <FormLabel>
            <Typography variant="h6">{t('newExpense.date')} </Typography>
          </FormLabel>
          <InputLine id="date" value={date} onChange={handleDateChange} />
          <FormLabel>
            <Typography variant="h6">{t('newExpense.description')} </Typography>
          </FormLabel>
          <InputLine id="description" value={description} onChange={handleDescriptionChange} />
          <StyledButton onClick={handleSubmit}>
            <Typography variant="h6">{t('newExpense.save')}</Typography>
          </StyledButton>
        </FormGroup>
      </FormWrapper>
    </Wrapper>
  );
};
