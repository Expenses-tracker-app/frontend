import React from 'react';
import { Link } from 'react-router-dom';
import paths from '../../../utilities/pathnames';
import { useTranslation } from 'react-i18next';
import { Grid, styled, Typography } from '@mui/material';

// Styles

const Wrapper = styled(Grid)(({ theme }) => ({
  padding: '10px 14px 15px 10px',
  height: '40px',
  boxShadow: theme.shadows[2]
}));

const Text = styled(Typography)(() => ({
  fontSize: '12px',
  fontWeight: '400',
  textAlign: 'right',
  marginButton: '20px'
}));

const Header = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {/* <Logo href={paths.home.path}>
        <img className="img" src="/images/logo.png" alt="Logo" />
      </Logo> */}
      <div>
        <Link to={paths.home.path}>{t('common.ok')}</Link>
      </div>

      <Text>{t('common.ok')}</Text>

      <Text>{t('common.ok')}</Text>

      <Link to={paths.profile.path}>
        <Text>{t('common.ok')}</Text>
      </Link>
    </Wrapper>
  );
};

export default Header;
