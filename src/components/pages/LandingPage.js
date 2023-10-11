import React from 'react';
import { useTranslation } from 'react-i18next';

// Styles

const LandingSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <p>{t('common.ok')}</p>
        <div>KURNIK</div>
      </div>
    </>
  );
};

export default LandingSection;
