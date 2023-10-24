import React from 'react';
import PropTypes from 'prop-types';

import { styled, ListItemButton, Typography } from '@mui/material';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  background: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'space-between'
}));

const StyledNameText = styled('div')(({ theme }) => ({
  '&': {
    color: theme.palette.text.primary
  }
}));

const StyledTimestampText = styled('div')(({ theme }) => ({
  '&': {
    color: theme.palette.text.secondary
  }
}));

const StyledAmountText = styled('div')(({ theme }) => ({
  '&': {
    color: theme.palette.primary.green
  }
}));

const ExpenseItem = ({ title, date, amount }) => {
  return (
    <StyledListItemButton>
      <div>
        <StyledNameText>
          <Typography variant="h3">{title}</Typography>
        </StyledNameText>

        <StyledTimestampText>
          <Typography variant="body1">{date}</Typography>
        </StyledTimestampText>
      </div>
      <div>
        <StyledAmountText>
          <Typography variant="h3">{amount}€</Typography>
        </StyledAmountText>
      </div>
    </StyledListItemButton>
  );
};

ExpenseItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
};

export default ExpenseItem;
