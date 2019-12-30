/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api from './api';

const baseURL = '/users';

const loginUser = (email, pwd) => api.post(`${baseURL}/login`, { email, pwd });

const getOracles = async () => {
  try {
    const response = await api.get(`${baseURL}/oracles`);
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
    const response = await api.get(`${baseURL}/roles`);
    return response && response.data;
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

const register = user => api.post(`${baseURL}/signup`, user);

const recoverPassword = async email => {
  try {
    const response = await api.post(`${baseURL}/recoverPassword`, { email });
    return response;
  } catch (error) {
    return { error };
  }
};

const updatePassword = async (token, password) => {
  try {
    const response = await api.put(`${baseURL}/password`, {
      token,
      password
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const getMyProjects = async userId => {
  try {
    const response = await api.get(`${baseURL}/${userId}/projects`);
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
  getAllRoles,
  register,
  recoverPassword,
  updatePassword,
  getMyProjects
};
