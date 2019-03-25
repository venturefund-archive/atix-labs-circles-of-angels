import api from './api';

const baseURL = '/user';

const loginUser = async ({ userName, password }) => {
  try {
    // const response = api.post(`${baseURL}/login`, {
    //   userName,
    //   password
    // });
    // return response.data;
    return {
      data: {
        id: 1,
        username: 'Pepe Maidana'
      }
    };
  } catch (error) {
    return { error };
  }
};

export { loginUser };
