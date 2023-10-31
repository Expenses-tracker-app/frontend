import React from 'react';
import {useTranslation} from 'react-i18next'
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
import paths from '../../utilities/pathnames'

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
            <StyledButton href={paths.settings.path}>
              <Typography variant="h6">{t('settings.save')}</Typography>
            </StyledButton>
          </FormGroup>
        </FormWrapper>
      </Wrapper>
    );
  };
  