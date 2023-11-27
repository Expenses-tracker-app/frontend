import React from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Wrapper = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const Content = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100px',
  marginTop: '100px'
}));

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Content>
        <Typography variant="h1">{t('errors.pageNotFound')}</Typography>
        <Typography>{t('errors.pageDoesNotExist')}</Typography>
      </Content>
    </Wrapper>
  );
};
