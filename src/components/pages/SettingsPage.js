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
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypePassword: ''
  });

  const handleSave = () => {
    if (formData.password === formData.retypePassword) {
      if (formData.email && formData.password) {
        const passwordRegex = /^(?=.*[a-zA-Z]{5,})(?=.*\d).*$/;

        if (passwordRegex.test(formData.password)) {
          const user = {
            email: formData.email,
            password: formData.password
          };

          updateUser(user)
            .then((res) => {
              console.log(res);
              setUpdated(true);
            })
            .catch((err) => {
              setError(err.message);
              console.err(err.message || t('errors.userUpdateError'));
            });
        } else {
          setError('Password must have at least 5 letters, 1 number, and no special characters.');
        }
      } else {
        setError('Passwords do not match');
      }
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
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormLabel>
            <Typography variant="h6">{t('settings.retypePassword')}</Typography>
          </FormLabel>
          <InputLine
            type="text"
            name="retypePassword"
            value={formData.retypePassword}
            onChange={handleChange}
          />

          <StyledButton onClick={handleSave}>
            <Typography variant="h6">{t('settings.save')}</Typography>
          </StyledButton>

          {error && (
            <MuiAlert severity="error" sx={{ marginTop: 2 }} variant="filled">
              {error}
            </MuiAlert>
          )}

          {updated && (
            <MuiAlert severity="success" sx={{ marginTop: 2 }} variant="filled">
              {updated}
            </MuiAlert>
          )}
        </FormGroup>
      </FormWrapper>
    </Wrapper>
  );
};
