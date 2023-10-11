import React from 'react';
import { Link } from 'react-router-dom';
import paths from '../../../utilities/pathnames';
import { useTranslation } from 'react-i18next';
import { Grid, styled, Button } from '@mui/material';
import logo from '../../../assets/logo.png';

// Styles

const Wrapper = styled(Grid)(({ theme }) => ({
  padding: '0px 14px 0px 10px',
  height: '50px',
  boxShadow: theme.shadows[2],
  justifyContent: 'space-between'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.blue,
  color: theme.palette.primary.main,
  borderRadius: 25,
  padding: '0px 20px 0px 20px',
  margin: '8px',
  fontSize: '14px',
  '&:hover': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.blue
  }
}));

const Header = () => {
  const { t } = useTranslation();

  return (
    <Wrapper container>
      <Grid container item xs={2} href={paths.home.path}>
        <Link to={paths.home.path}>
          <img src={logo} height="50px" />
        </Link>
      </Grid>

      <StyledButton href={paths.profile.path}>{t('user.login')}</StyledButton>
    </Wrapper>
  );
};

export default Header;
