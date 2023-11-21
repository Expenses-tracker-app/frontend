import React from 'react';
import PropTypes from 'prop-types';

import { styled, ListItemButton, Typography } from '@mui/material';
import { ArcElement } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
ChartJS.register(ArcElement);

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  background: theme.palette.grey[600],
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const Date = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: '12px'
}));

const Expense = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.red,
  fontWeight: '600'
}));

const Income = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.green,
  fontWeight: '600'
}));

const TransactionItem = ({ desc, date, amount, isExpense }) => {
  return (
    <StyledListItemButton>
      <div>
        <Typography variant="h5">{desc}</Typography>
        <Date>{date}</Date>
      </div>
      <div>
        {isExpense ? (
          <Expense variant="h5"> -{amount}€</Expense>
        ) : (
          <Income variant="h5">{amount}€</Income>
        )}
      </div>
    </StyledListItemButton>
  );
};

TransactionItem.propTypes = {
  desc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  isExpense: PropTypes.bool.isRequired
};

export default TransactionItem;
