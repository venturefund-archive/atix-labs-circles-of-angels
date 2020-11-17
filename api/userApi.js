/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api, { doGet, doPut, doPost } from './api';
import apiCall from './apiCall';
import questionsToText from '../helpers/questionsToText';

const baseURL = '/users';

const getMyProjects = async () => doGet(`${baseURL}/me/projects`);

const getFollowedProjects = async () =>
  apiCall('get', `${baseURL}/followed-projects`);

const getAppliedProjects = async () =>
  apiCall('get', `${baseURL}/applied-projects`);

const loginUser = (email, pwd) =>
  apiCall('post', `${baseURL}/login`, { email, pwd });

const getOracles = async () => {
  try {
    const response = await api.get(`${baseURL}/oracles`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

const getUsers = () => apiCall('get', `${baseURL}`);

const getUser = userId => doGet(`${baseURL}/${userId}`);

const changeUserRegistrationStatus = (userId, registrationStatus) =>
  apiCall('put', `${baseURL}/${userId}`, {
    registrationStatus
  });

const register = (user, { address, encryptedWallet, mnemonic }) => {
  const answers = questionsToText(user);
  return apiCall('post', `${baseURL}/signup`, {
    ...user,
    answers,
    address,
    encryptedWallet,
    mnemonic
  });
};

const recoverPassword = (data) => 
  doPost(`${baseURL}/recoverPassword`, data);

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

const changePassword = data =>
  doPut(`${baseURL}/me/password`, data);

const changeRecoverPassword = data =>
  doPut(`${baseURL}/me/recover-password`, data);

const getWallet = () => doGet(`${baseURL}/me/wallet`);

const getMnemonicFromToken = token => doGet(`${baseURL}/mnemonic/${token}`);

const getCountries = async () => apiCall('get', 'countries');

const confirmEmail = async userId =>
  doPut(`${baseURL}/${userId}/email/confirm`, {});

export {
  loginUser,
  getOracles,
  getUsers,
  getUser,
  changeUserRegistrationStatus,
  getCountries,
  register,
  recoverPassword,
  updatePassword,
  changePassword,
  changeRecoverPassword,
  getMyProjects,
  getFollowedProjects,
  getAppliedProjects,
  getWallet,
  getMnemonicFromToken,
  confirmEmail
};
