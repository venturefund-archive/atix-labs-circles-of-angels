import api from './api';

const baseURL = '/general';

const getDestinationCOAAccount = async () => {
  try {
    const response = await api.get(`${baseURL}/accountDestination`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

export { getDestinationCOAAccount };
