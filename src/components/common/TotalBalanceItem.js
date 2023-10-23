import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { styled, Typography, Container } from '@mui/material';

const Wrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'center',
  height: '100px',
  width: '100%'
}));

const StyledTotalBalanceText = styled('div')(({ theme }) => ({
  '&': {
    color: theme.palette.text.secondary
  }
}));

const StyledAmountText = styled('div')(({ theme }) => ({
  '&': {
    color: theme.palette.text.primary
  }
}));

const StyledPercentageText = styled('div')(({ theme }) => ({
  '&': {
    color: theme.palette.primary.green
  }
}));

const TotalBalanceItem = ({ amount, percentage }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <StyledTotalBalanceText>
        <Typography variant="body1">{t('myExpenses.totalBalance')}</Typography>
      </StyledTotalBalanceText>

      <StyledAmountText>
        <Typography variant="h2">{amount}</Typography>
      </StyledAmountText>

      <StyledPercentageText>
        <Typography variant="body1">{percentage}</Typography>
      </StyledPercentageText>
    </Wrapper>
  );
};

TotalBalanceItem.propTypes = {
  amount: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired
};

export default TotalBalanceItem;
