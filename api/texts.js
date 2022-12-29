import api from './api';

const defaultLanguage = 'en';

const languagesPath = {
  en: '/languages/default.json',
  es: '/languages/spanish.json',
};

export const fetchTexts = async() => {
  const userLang = navigator.language || defaultLanguage;
  const userLanguagePath = languagesPath[userLang] || languagesPath[defaultLanguage];
  const response = await api.get(`${userLanguagePath}`);
  return response.data;
}
