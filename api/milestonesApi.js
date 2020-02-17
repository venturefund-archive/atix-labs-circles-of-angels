/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api, { doPut, doDelete, doPost } from './api';
import apiCall from './apiCall';

const baseURL = '/milestones';

export const updateMilestone = (milestoneId, saveData) =>
  doPut(`${baseURL}/${milestoneId}`, saveData);

export const deleteMilestone = milestoneId =>
  doDelete(`${baseURL}/${milestoneId}`);

export const createMilestone = (projectId, saveData) =>
  doPost(`/projects/${projectId}${baseURL}`, saveData);

export const claimMilestone = milestoneId =>
  doPost(`${baseURL}/${milestoneId}/claim`);

// TODO: delete, used in old consensus page
const deleteActivity = async activityId => {
  try {
    console.log('Deleting activity', activityId);

    const response = await api.delete(`/activities/${activityId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

const getAllMilestones = () => apiCall('get', `${baseURL}`);

const getAllBudgetStatus = async () => {
  try {
    const response = await api.get(`${baseURL}/budgetStatus`);
    return response;
  } catch (error) {
    return { error };
  }
};

const changeBudgetStatus = (milestoneId, budgetStatusId) =>
  apiCall('put', `${baseURL}/${milestoneId}`, {
    milestone: {
      budgetStatus: budgetStatusId
    }
  });

export {
  deleteActivity,
  getAllMilestones,
  getAllBudgetStatus,
  changeBudgetStatus
};
