/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api from './api';
import apiCall from './apiCall';

const baseURL = 'milestones';
const restActivityBasePath = 'activities';

const updateMilestone = async ({
  budget,
  category,
  id,
  impact,
  impactCriterion,
  keyPersonnel,
  project,
  quarter,
  signsOfSuccess,
  signsOfSuccessCriterion,
  tasks,
  type
}) => {
  try {
    console.log('Updating milestone', id);
    const response = await api.put(`${baseURL}/${id}`, {
      milestone: {
        budget,
        category,
        id,
        impact,
        impactCriterion,
        keyPersonnel,
        project,
        quarter,
        signsOfSuccess,
        signsOfSuccessCriterion,
        tasks,
        type
      }
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const deleteMilestone = async milestoneId => {
  try {
    console.log('Deleting milestone', milestoneId);

    const response = await api.delete(`${baseURL}/${milestoneId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

const deleteActivity = async activityId => {
  try {
    console.log('Deleting activity', activityId);

    const response = await api.delete(`${restActivityBasePath}/${activityId}`);
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
  updateMilestone,
  deleteMilestone,
  deleteActivity,
  getAllMilestones,
  getAllBudgetStatus,
  changeBudgetStatus
};
