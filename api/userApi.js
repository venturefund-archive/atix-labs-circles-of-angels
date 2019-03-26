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

export { loginUser };
