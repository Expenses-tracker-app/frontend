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
  Typography
} from '@mui/material';
//import paths from '../../utilities/pathnames'

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

export const RegistrationPage = () => {
  const { t } = useTranslation();

  const [people, setPeople] = useState([]);
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

    const handleSubmit = () => {
      if (newPerson.password == newPerson.retypePassword) {
        setPeople([...people, newPerson])
        setNewPerson({email: '', password: '', retypePassword: ''})
        setPasswordMismatch(false)
        setRegistrationDone(true)
        console.log('Submitting registration done')
        localStorage.setItem('people', JSON.stringify(people))
        console.log(people)
      } else {
        setPasswordMismatch(true)
        setRegistrationDone(false)
      }
  const handleSubmit = () => {
    if (newPerson.password == newPerson.retypePassword) {
      setPeople([...people, newPerson]);
      setNewPerson({ email: '', password: '', retypePassword: '' });
      setPasswordMismatch(false);
      setRegistrationDone(true);
      console.log('Submitting registration done');
      localStorage.setItem('people', JSON.stringify(people));
    } else {
      setPasswordMismatch(true);
      setRegistrationDone(false);
    }
  
    return (
      <Wrapper>
        <Typography variant="h1">{t('registration.title')}</Typography>
        <FormWrapper>
          <FormGroup>
            <FormLabel>
              <Typography variant="h6">{t('registration.email')}</Typography>
            </FormLabel>
            <InputLine id="settings_email" value={newPerson.email} onChange={handleEmailChange}/>
            <FormLabel>
              <Typography variant="h6">{t('registration.password')}</Typography>
            </FormLabel>
            <InputLine id="settings_psw" type="password" value={newPerson.password} onChange={handlePasswordChange}/>
            <FormLabel>
              <Typography variant="h6">{t('registration.retypePassword')}</Typography>
            </FormLabel>
            <InputLine id="settings_retype_psw" type="password" value={newPerson.retypePassword} onChange={handleRetypePasswordChange}/>
            {passwordMismatch && <p style={{ color: 'red' }}>Passwords do not match.</p>}
            <StyledButton onClick={handleSubmit}>
              <Typography variant="h6">{t('registration.save')}</Typography>
            </StyledButton>
            {registrationDone && <p style={{ color: 'green' }}>Registration succesfull.</p>}
          </FormGroup>
        </FormWrapper>
      </Wrapper>
    );
  };
  