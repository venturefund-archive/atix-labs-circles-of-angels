import apiCall from './apiCall';

const countriesBaseURL = '/countries';

export const getCountries = () => apiCall('get', `${countriesBaseURL}`);
