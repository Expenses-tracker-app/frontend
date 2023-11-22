import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import paths from '../../../utilities/pathnames';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  styled,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
  padding: '5px 20px 5px 20px',
  margin: '8px',
  fontSize: '14px',
  border: '1px solid white',
  '&:hover': {
    background: 'none',
    color: theme.palette.primary.main
  }
}));

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  marginTop: '3px'
}));

const MenuDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    alignItems: 'center',
    width: '200px',
    background: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }
}));

const MLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover, &:focus': {
    borderBottom: `0.5px solid ${theme.palette.primary.blue}`
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const Header = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Wrapper container>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <MenuDrawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Link to={paths.home.path}>
          <img src={logo} alt="Logo" height="50px" />
        </Link>
        <List>
          <ListItem component={MLink} to={paths.home.path} onClick={handleDrawerClose}>
            <ListItemText primary={t('menu.dashboard')} />
          </ListItem>
          <ListItem component={MLink} to={paths.transactions.path} onClick={handleDrawerClose}>
            <ListItemText primary={t('menu.transactions')} />
          </ListItem>
          <ListItem component={MLink} to={paths.categories.path} onClick={handleDrawerClose}>
            <ListItemText primary={t('menu.categories')} />
          </ListItem>
          <ListItem component={MLink} to={paths.settings.path} onClick={handleDrawerClose}>
            <ListItemText primary={t('menu.settings')} />
          </ListItem>
          <ListItem component={MLink} to={paths.login.path} onClick={handleDrawerClose}>
            <ListItemText primary={t('menu.logout')} />
          </ListItem>
        </List>
      </MenuDrawer>

      <StyledLink to={paths.home.path}>
        <img src={logo} alt="Logo" height="50px" />
      </StyledLink>

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
