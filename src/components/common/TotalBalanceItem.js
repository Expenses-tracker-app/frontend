import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { styled, Typography, Container } from '@mui/material';

const Wrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'center',
  height: '120px',
  width: '100%',
  marginLeft: '10px'
}));

const TotalBalance = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
  fontSize: '13px',
  weight: '300',
  marginBottom: '2px'
}));

const Percentage = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.green,
  fontSize: '13px',
  marginTop: '2px'
}));

const TotalBalanceItem = ({ amount, percentage }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <TotalBalance>{t('transactions.totalBalance')}</TotalBalance>

      <Typography variant="h2">{amount}</Typography>

      <Percentage>{percentage}%</Percentage>
    </Wrapper>
  );
};

TotalBalanceItem.propTypes = {
  amount: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired
};

export default TotalBalanceItem;
