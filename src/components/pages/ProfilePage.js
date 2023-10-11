import React from 'react';
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

export const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Typography variant="h1">{t('specific.welcome')}</Typography>
      <FormWrapper>
        <FormGroup>
          <FormLabel>
            <Typography variant="h6">{t('user.email')}</Typography>
          </FormLabel>
          <InputLine id="email" />
          <FormLabel>
            <Typography variant="h6">{t('user.password')}</Typography>
          </FormLabel>
          <InputLine id="psw" />
          <StyledButton href={paths.profile.path}>
            <Typography variant="h6">{t('user.login')}</Typography>
          </StyledButton>
        </FormGroup>
      </FormWrapper>
    </Wrapper>
  );
};
