import React from 'react';
import { Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import paths from '../../utilities/pathnames';

const Wrapper = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const Content = styled('div')(() => ({
  textAlign: 'center'
}));

const MLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

export const NavigationPage = () => {
  return (
    <Wrapper>
      <Content>
        <div>
          <h1>
            <MLink to={paths.home.path}>My Dashboard</MLink>
          </h1>
          <h1>
            <MLink to={paths.transactions.path}>My Transactions</MLink>
          </h1>
          <h1>
            <MLink to={paths.categories.path}>Categories</MLink>
          </h1>
          <h1>
            <MLink to={paths.reports.path}>Reports</MLink>
          </h1>
          <h1>
            <MLink to={paths.calendar.path}>Calendar</MLink>
          </h1>
          <h1>
            <MLink to={paths.settings.path}>Settings</MLink>
          </h1>
          <h1>
            <MLink to={paths.login.path}>Logout</MLink>
          </h1>
        </div>
      </Content>
    </Wrapper>
  );
};
