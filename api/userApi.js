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

const getUsers = async () => {
  try {
    const response = await api.get(`${baseURL}`);
    return response.data.users;
  } catch (error) {
    return { error };
  }
};

const getAllRoles = async () => {
  try {
    const response = await api.get(`${baseURL}/role`);
    return response;
  } catch (error) {
    return { error };
  }
};

const getAllUserRegistrationStatus = async () => {
  try {
    const response = await api.get(`${baseURL}/registrationStatus`);
    return response;
  } catch (error) {
    return { error };
  }
};

const changeUserRegistrationStatus = async (userId, registrationStatus) => {
  try {
    const response = await api.put(`${baseURL}/${userId}`, {
      registrationStatus
    });
    return response;
  } catch (error) {
    return { error };
  }
};

export {
  loginUser,
  getOracles,
  getUsers,
  changeUserRegistrationStatus,
  getAllUserRegistrationStatus,
  getAllRoles
};
