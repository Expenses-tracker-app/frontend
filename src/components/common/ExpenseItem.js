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
  margin: '0 10px 0 10px'
}));

const Date = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: '12px'
}));

const Amount = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.green,
  fontWeight: '600'
}));

const ExpenseItem = ({ desc, date, amount }) => {
  return (
    <StyledListItemButton>
      <div>
        <Typography variant="h5">{desc}</Typography>
        <Date>{date}</Date>
      </div>
      <div>
        <Amount variant="h5">{amount}€</Amount>
      </div>
    </StyledListItemButton>
  );
};

ExpenseItem.propTypes = {
  desc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
};

export default ExpenseItem;
