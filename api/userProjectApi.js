/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api from './api';

const baseURL = '/userProject';

const getUsers = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}/getUsers`);
    return response;
  } catch (error) {
    return { error };
  }
};

const signAgreement = async (userId, projectId) => {
  try {
    const response = await api.get(
      `${baseURL}/${userId}/${projectId}/signAgreement`
    );
    return response;
  } catch (error) {
    return { error };
  }
};

const createUserProject = async (userId, projectId) => {
  try {
    const response = await api.get(`${baseURL}/${userId}/${projectId}/create`);

    return response;
  } catch (error) {
    return { error };
  }
};

export { getUsers, signAgreement, createUserProject };
