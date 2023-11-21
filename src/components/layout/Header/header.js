import React from 'react';
import { Link } from 'react-router-dom';
import paths from '../../../utilities/pathnames';
import { useTranslation } from 'react-i18next';
import { Grid, styled, Button } from '@mui/material';
import logo from '../../../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../../utilities/AuthContext';

// Styles

const Wrapper = styled(Grid)(({ theme }) => ({
  padding: '0px 14px 0px 10px',
  height: '50px',
  boxShadow: theme.shadows[2],
  justifyContent: 'space-between'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.blue,
  borderRadius: 25,
  padding: '0px 20px 0px 20px',
  margin: '8px',
  fontSize: '14px',
  '&:hover': {
    background: 'none',
    color: theme.palette.primary.main,
    border: '1px solid white'
  }
}));

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none'
}));

const Header = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Wrapper container>
      <StyledLink to={paths.navigation.path}>
        <StyledButton>{t('navigation.button')}</StyledButton>
      </StyledLink>

      <Grid container item xs={2} component={Link} to={paths.home.path}>
        <img src={logo} alt="Logo" height="50px" />
      </Grid>

      {isLoggedIn ? (
        <StyledLink>
          <StyledButton onClick={handleLogout}>{t('user.logout')}</StyledButton>
        </StyledLink>
      ) : (
        <StyledLink to={paths.login.path}>
          <StyledButton>{t('user.login')}</StyledButton>
        </StyledLink>
      )}
    </Wrapper>
  );
};

export default Header;
