import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'hi', 'fr'],
    fallbackLng: 'en',
    debug: true,
    // Options for language detector
    lng: 'en',
    react: { useSuspense: true },
    backend: {
      loadPath: 'https://stack-overflow-clone21122.onrender.com/locales/{{lng}}/{{ns}}.json',
    },
  })

export default i18n;
