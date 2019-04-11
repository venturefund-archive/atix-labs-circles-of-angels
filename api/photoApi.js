import api from './api';

const baseURL = '/photos';

const getPhoto = async id => {
  try {
    const response = await api.get(`${baseURL}/${id}`);
    return response;
  } catch (error) {
    return { error };
  }
};

export { getPhoto };
