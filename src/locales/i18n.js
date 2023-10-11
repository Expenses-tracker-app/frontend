import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';

const translationsJson = {
  en: {
    translation: en
  }
};

export const i18n = i18next.use(initReactI18next).init({
  resources: translationsJson,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});
