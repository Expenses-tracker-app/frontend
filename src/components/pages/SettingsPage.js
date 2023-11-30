import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateUser } from '../../services/apiService';

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
  boxShadow: theme.shadows[2],
  color: theme.palette.primary.main,
  background: theme.palette.grey[600],
  borderRadius: 25,
  [theme.breakpoints.down('md')]: {
    width: '80%'
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    width: '100%'
  }
}));

const InputLine = styled(Input)(({ theme }) => ({
  padding: '10px 14px 10px 14px',
  color: theme.palette.primary.main,
  background: theme.palette.secondary.main,
  margin: '10px 0 30px 0'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.blue,
  color: theme.palette.primary.main,
  borderRadius: 25,
  padding: '5px 20px 5px 20px',
  margin: '8px',
  fontSize: '14px',
  border: `1px solid ${theme.palette.primary.blue}`,
  '&:hover': {
    background: theme.palette.primary.blue
  }
}));

export const SettingsPage = () => {
  const { t } = useTranslation();
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');
  const [registrationDone, setRegistrationDone] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypePassword: ''
  });

  const handleSubmit = async () => {
    try {
      setAlert('');
      setRegistrationDone('');
      setError('');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (formData.email && emailRegex.test(formData.email)) {
        if (formData.password === formData.retypePassword && formData.password !== '') {
          const passwordRegex = /^(?=.*[a-zA-Z]{5,})(?=.*\d).*$/;

          if (passwordRegex.test(formData.password)) {
            const user = {
              email: formData.email,
              password: formData.password
            };

            updateUser(user)
              .then((res) => {
                setRegistrationDone(res || t('registration.success'));
              })
              .catch((err) => {
                setError(err.message || t('errors.registrationFailed'));
              });
          } else {
            setAlert(t('errors.passwordProtection'));
          }
        } else {
          setAlert(t('errors.passwordMismatch'));
        }
      } else {
        setAlert(t('errors.invalidEmail'));
      }
    } catch (err) {
      setError(err.message || t('errors.registrationError'));
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Wrapper>
      <Typography variant="h1">{t('settings.title')}</Typography>
      <FormWrapper>
        <FormGroup>
          <FormLabel>
            <Typography variant="h6">{t('settings.changeEmail')}</Typography>
          </FormLabel>
          <InputLine type="email" name="email" value={formData.email} onChange={handleChange} />
          <FormLabel>
            <Typography variant="h6">{t('settings.changePassword')}</Typography>
          </FormLabel>
          <InputLine
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormLabel>
            <Typography variant="h6">{t('settings.retypePassword')}</Typography>
          </FormLabel>
          <InputLine
            type="password"
            name="retypePassword"
            value={formData.retypePassword}
            onChange={handleChange}
          />

          <StyledButton onClick={handleSubmit}>
            <Typography variant="h6">{t('settings.save')}</Typography>
          </StyledButton>

          {registrationDone && (
            <MuiAlert severity="success" sx={{ marginTop: 2 }} variant="filled">
              {registrationDone}
            </MuiAlert>
          )}

          {alert && (
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
