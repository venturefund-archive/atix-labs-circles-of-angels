import api from './api';

const baseURL = '/user';

const loginUser = async (email, pwd) => {
  try {
    const response = await api.post(`${baseURL}/login`, {
      email,
      pwd
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const getOracles = async () => {
  try {
    const response = await api.get(`${baseURL}/oracle`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

export { loginUser, getOracles };
