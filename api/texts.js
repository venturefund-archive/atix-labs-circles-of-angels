import api from './api';

const defaultLanguage = 'en';

const languagesPath = {
  en: '/languages/default.json',
  es: '/languages/spanish.json',
};

export const fetchTexts = async() => {
  const userLang = defaultLanguage; // navigator.language in case to choose browser language
  const userLanguagePath = languagesPath[userLang];
  const response = await api.get(`${userLanguagePath}`);
  return response.data;
}
