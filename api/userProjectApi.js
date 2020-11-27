/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api from './api';
import apiCall from './apiCall';

const baseURL = '/userProjects';

const getUsers = async projectId => {
  try {
    const response = await api.get(`${baseURL}/projects/${projectId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

const signAgreement = async userProjectId => {
  try {
    const response = await api.put(`${baseURL}/${userProjectId}`, {
      status: 1
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const createUserProject = async (userId, projectId) => {
  try {
    const userProject = { userId, projectId };
    const response = await api.post(`${baseURL}`, userProject);

    return response;
  } catch (error) {
    return { error };
  }
};

const followProject = async projectId =>
  apiCall('post', `/projects/${projectId}/follow`);

const unfollowProject = async projectId =>
  apiCall('post', `/projects/${projectId}/unfollow`);

const isFollower = async projectId =>
  apiCall('get', `/projects/${projectId}/follower`);

const applyToProject = async (projectId, role) =>
  apiCall('post', `/projects/${projectId}/${role}`);

const isCandidate = async projectId =>
  apiCall('get', `/projects/${projectId}/candidate`);

export {
  getUsers,
  signAgreement,
  createUserProject,
  followProject,
  unfollowProject,
  isFollower,
  applyToProject,
  isCandidate
};
