import React from 'react';
import { Link } from 'react-router-dom';
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

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  margin: 'auto'
}));

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Typography variant="h1">{t('settings.title')}</Typography>
      <FormWrapper>
        <FormGroup>
          <FormLabel>
            <Typography variant="h6">{t('settings.changeEmail')}</Typography>
          </FormLabel>
          <InputLine id="settings_email" />
          <FormLabel>
            <Typography variant="h6">{t('settings.changePassword')}</Typography>
          </FormLabel>
          <InputLine id="settings_psw" />
          <FormLabel>
            <Typography variant="h6">{t('settings.retypePassword')}</Typography>
          </FormLabel>
          <InputLine id="settings_retype_psw" />

          <StyledLink to={paths.settings.path}>
            <StyledButton>
              <Typography variant="h6">{t('settings.save')}</Typography>
            </StyledButton>
          </StyledLink>
        </FormGroup>
      </FormWrapper>
    </Wrapper>
  );
};
