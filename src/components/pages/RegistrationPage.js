import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  Grid,
  FormLabel,
  styled,
  Input,
  FormGroup,
  Typography,
  Alert as MuiAlert
} from '@mui/material';
import { createUser } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import paths from '../../utilities/pathnames';

// Styles
const Wrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px'
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
  marginTop: '50px',
  padding: '50px 50px 30px 50px',
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  boxShadow: theme.shadows[2],
  color: theme.palette.primary.main,
  background: theme.palette.grey[600],
  borderRadius: 25
}));

const InputLine = styled(Input)(({ theme }) => ({
  padding: '10px 15px 10px 15px',
  color: theme.palette.primary.main,
  background: theme.palette.secondary.main,
  margin: '10px 0 40px 0'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.blue,
  borderRadius: 25,
  width: '30%',
  padding: '10px 0px 10px 0px',
  margin: 'auto',
  '&:hover': {
    background: theme.palette.primary.blue
  }
}));

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);
  const [newPerson, setNewPerson] = useState({ email: '', password: '', retypePassword: '' });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);

  const handleEmailChange = (e) => {
    setNewPerson({ ...newPerson, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setNewPerson({ ...newPerson, password: e.target.value });
  };

  const handleRetypePasswordChange = (e) => {
    setNewPerson({ ...newPerson, retypePassword: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (newPerson.password === newPerson.retypePassword && newPerson.password !== '') {
        setNewPerson({ email: '', password: '', retypePassword: '' });
        setPasswordMismatch(false);

        const email = newPerson.email;
        const password = newPerson.password;
        const username = newPerson.email;

        const user = { email, password, username };
        const { status, message } = await createUser(user);

        if (status === 200) {
          setRegistrationDone(true);
          setAlert(message || t('registration.success'));
          navigate(paths.login.path);
        } else {
          setError(message || t('errors.registrationFailed'));
        }
      } else {
        setPasswordMismatch(true);
        setRegistrationDone(false);
        setAlert(t('errors.passwordMismatch'));
      }
    } catch (err) {
      setError(err.message || t('errors.registrationError'));
    }
  };

  return (
    <Wrapper>
      <Typography variant="h1">{t('registration.title')}</Typography>
      <FormWrapper>
        <FormGroup>
          <FormLabel>
            <Typography variant="h6">{t('registration.email')}</Typography>
          </FormLabel>
          <InputLine id="settings_email" value={newPerson.email} onChange={handleEmailChange} />
          <FormLabel>
            <Typography variant="h6">{t('registration.password')}</Typography>
          </FormLabel>
          <InputLine
            id="settings_psw"
            type="password"
            value={newPerson.password}
            onChange={handlePasswordChange}
          />
          <FormLabel>
            <Typography variant="h6">{t('registration.retypePassword')}</Typography>
          </FormLabel>
          <InputLine
            id="settings_retype_psw"
            type="password"
            value={newPerson.retypePassword}
            onChange={handleRetypePasswordChange}
          />

          <StyledButton onClick={handleSubmit}>
            <Typography variant="h6">{t('registration.save')}</Typography>
          </StyledButton>

          {registrationDone && (
            <MuiAlert severity="success" sx={{ marginTop: 2 }} variant="filled">
              {alert}
            </MuiAlert>
          )}

          {passwordMismatch && (
            <MuiAlert severity="warning" sx={{ marginTop: 2 }} variant="filled">
              {alert}
            </MuiAlert>
          )}

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
