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
  boxShadow: theme.shadows[2],
  color: theme.palette.primary.main,
  background: theme.palette.grey[600],
  borderRadius: 25,
  [theme.breakpoints.down('md')]: {
    width: '80%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
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
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');
  const [registrationDone, setRegistrationDone] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypePassword: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      setAlert('');
      setRegistrationDone('');
      setError('');

      // Check if password and retypePassword match and meet the criteria
      if (formData.password === formData.retypePassword && formData.password !== '') {
        const passwordRegex = /^(?=.*[a-zA-Z]{5,})(?=.*\d).*$/;

        if (passwordRegex.test(formData.password)) {
          // Check if email is set up and in the correct format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (formData.email && emailRegex.test(formData.email)) {
            const user = {
              email: formData.email,
              password: formData.password
            };

            createUser(user)
              .then((res) => {
                setRegistrationDone(res || t('registration.success'));
                navigate(paths.login.path);
              })
              .catch((err) => {
                setError(err.message || t('errors.registrationFailed'));
              });
          } else {
            setError(t('errors.invalidEmail'));
          }
        } else {
          setAlert(t('errors.passwordProtection'));
        }
      } else {
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
          <InputLine type="email" value={formData.email} name="email" onChange={handleChange} />
          <FormLabel>
            <Typography variant="h6">{t('registration.password')}</Typography>
          </FormLabel>
          <InputLine
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormLabel>
            <Typography variant="h6">{t('registration.retypePassword')}</Typography>
          </FormLabel>
          <InputLine
            type="password"
            name="retypePassword"
            value={formData.retypePassword}
            onChange={handleChange}
          />

          <StyledButton onClick={handleSubmit}>
            <Typography variant="h6">{t('registration.save')}</Typography>
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
