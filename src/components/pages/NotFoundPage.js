import React from 'react';
import { Grid, styled, Typography } from '@mui/material';

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
  return (
    <Wrapper>
      <Content>
        <Typography variant="h1">404 - Not Found!</Typography>
        <Typography>Sorry, the page you are looking for does not exist.</Typography>
      </Content>
    </Wrapper>
  );
};
