import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import paths from '../../utilities/pathnames';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  styled,
  FormLabel,
  Input,
  FormGroup,
  Typography,
  Alert as MuiAlert
} from '@mui/material';
import { login } from '../../services/apiService';
import { useContext } from 'react';
import { AuthContext } from '../../utilities/AuthContext';

// Styles
const Wrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px'
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
  marginTop: '30px',
  padding: '50px',
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding: '20px'
  },
  boxShadow: theme.shadows[2],
  color: theme.palette.primary.main,
  background: theme.palette.grey[600],
  borderRadius: 25
}));

const InputLine = styled(Input)(({ theme }) => ({
  padding: '10px 14px 10px 14px',
  color: theme.palette.primary.main,
  background: theme.palette.secondary.main,
  margin: '10px 0 50px 0'
}));

const Text = styled(Typography)(() => ({
  weight: 100,
  fontSize: '12px',
  margin: '20px auto 0px auto'
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.blue,
  borderRadius: 25,
  width: '30%',
  padding: '7px 0px 7px 0px',
  margin: 'auto',
  '&:hover': {
    background: theme.palette.primary.blue
  }
}));

const MLink = styled(Link)(({ theme }) => ({
  textDecoration: 'underlined',
  fontWeight: 400,
  cursor: 'pointer',
  color: theme.palette.primary.main
}));

export const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);

  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submitLogin = async () => {
    try {
      const credentials = { email, password };
      const { status, message } = await login(credentials);
      if (status === 200) {
        handleLogin();
      } else {
        setError(message || t('errors.loginFailed'));
      }
    } catch (err) {
      setError(err.message || t('errors.loginError'));
    }
  };

  return (
    <Wrapper>
      <Typography variant="h1">{t('specific.welcome')}</Typography>
      <FormWrapper>
        <FormGroup>
          <FormLabel>
            <Typography variant="h6">{t('user.email')}</Typography>
          </FormLabel>
          <InputLine
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel>
            <Typography variant="h6">{t('user.password')}</Typography>
          </FormLabel>
          <InputLine
            id="psw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton onClick={submitLogin}>
            <Typography variant="h6">{t('user.login')}</Typography>
          </LoginButton>

          <Text>
            Dont have an account? <MLink to={paths.registration.path}>Create</MLink>
          </Text>

          {error && (
            <MuiAlert severity="error" sx={{ marginTop: 2 }} variant="filled">
              {error}
            </MuiAlert>
          )}
        </FormGroup>
      </FormWrapper>
    </Wrapper>
  );
};
