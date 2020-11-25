/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import queryString from 'query-string';
import api, { doGet, doPut, doDelete, doPost } from './api';

const baseURL = '/milestones';

export const updateMilestone = (milestoneId, saveData) =>
  doPut(`${baseURL}/${milestoneId}`, saveData);

export const deleteMilestone = milestoneId =>
  doDelete(`${baseURL}/${milestoneId}`);

export const createMilestone = (projectId, saveData) =>
  doPost(`/projects/${projectId}${baseURL}`, saveData);

export const claimMilestone = milestoneId =>
  doPost(`${baseURL}/${milestoneId}/claim`);

export const transferredMilestone = (milestoneId, saveData) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPut(`${baseURL}/${milestoneId}/transferred`, saveData, config);
};

// TODO: delete, used in old consensus page
export const deleteActivity = async activityId => {
  try {
    const response = await api.delete(`/activities/${activityId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

export const getMilestones = async filters => {
  const queryParams = queryString.stringify(filters, {
    skipNull: true
  });

  return doGet(`${baseURL}?${queryParams}`);
};
