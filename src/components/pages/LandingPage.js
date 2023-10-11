import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, styled } from '@mui/material';

// Styles
const Wrapper = styled(Grid)(({ theme }) => ({
  padding: '0px 14px 0px 10px',
  height: '50px',
  boxShadow: theme.shadows[2],
  justifyContent: 'space-between',
  color: theme.palette.primary.main
}));

export const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper>
        {t('common.ok')}
        <div>TEST</div>
      </Wrapper>
    </>
  );
};
