import api from './api';
import formatError from '../helpers/errorFormatter';

const apiCall = (method, url, params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await api[method](url, params);
      resolve(response && response.data);
    } catch (error) {
      reject(formatError(error));
    }
  });

export default apiCall;
