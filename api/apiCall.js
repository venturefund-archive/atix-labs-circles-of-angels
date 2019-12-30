import api from './api';
import formatError from '../helpers/errorFormatter';

const apiCall = (method, url, params, config) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await api.request({
        method,
        url,
        data: params,
        ...config
      });

      resolve(response && response.data);
    } catch (error) {
      reject(formatError(error));
    }
  });

export default apiCall;
