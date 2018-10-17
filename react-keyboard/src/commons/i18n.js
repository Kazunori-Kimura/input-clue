import i18next from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

import langEn from './locales/en';
import langJa from './locales/ja';

export default i18next
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'ja',
    resources: {
      en: {
        translation: langEn,
      },
      ja: {
        translation: langJa,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });
