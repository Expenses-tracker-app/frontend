import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  Grid,
  styled,
  FormLabel,
  Input,
  FormGroup,
  Typography
} from '@mui/material';
//import paths from '../../utilities/pathnames';

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

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.blue,
  borderRadius: 25,
  width: '30%',
  padding: '7px 0px 7px 0px',
  margin: 'auto',
  '&:hover': {
    background: theme.palette.primary.blue
  }
}));

export const LoginPage = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const storedPeople = JSON.parse(localStorage.getItem('people')) || [];
    const user = storedPeople.find(
      (person) => person.email === email && person.password === password
    );
    if (user) {
      setError('');
      console.log('Login succesfull');
    } else {
      setError('Invalid email or password');
      console.log('login failed');
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
          <StyledButton onClick={handleLogin}>
            <Typography variant="h6">{t('user.login')}</Typography>
          </StyledButton>
          {error && <p>{error}</p>}
        </FormGroup>
      </FormWrapper>
    </Wrapper>
  );
};
