/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api, { doPut, doDelete, doPost, doGet } from './api';
import milestoneActivityStatus from '../constants/MilestoneActivityStatus';

const baseURL = '/activities';

export const updateTask = (taskId, saveData) =>
  doPut(`${baseURL}/${taskId}`, saveData);

export const deleteTask = taskId => doDelete(`${baseURL}/${taskId}`);

export const createTask = (milestoneId, taskData) =>
  doPost(`/milestones/${milestoneId}${baseURL}`, taskData);

export const assignOracleToActivity = (taskId, oracleId) =>
  doPut(`${baseURL}/${taskId}/assign-oracle`, { oracleId });

export const uploadEvidenceGetTransaction = (taskId, data, status) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPost(
    `${baseURL}/${taskId}/claim/${status}/get-transaction`,
    data,
    config
  );
};

export const uploadEvidenceSendTransaction = (taskId, data, status) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPost(
    `${baseURL}/${taskId}/claim/${status}/send-transaction`,
    data,
    config
  );
};

export const getEvidences = taskId => doGet(`${baseURL}/${taskId}/claims`);

export const getEvidenceBlockchainData = evidenceId =>
  doGet(`/evidences/${evidenceId}/blockchain-data`);

const updateActivity = async ({
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
  tasks
}) => {
  try {
    const response = await api.put(`${baseURL}/${id}`, {
      activity: {
        budget,
        category,
        impact,
        impactCriterion,
        keyPersonnel,
        project,
        quarter,
        signsOfSuccess,
        signsOfSuccessCriterion,
        tasks
      }
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const unassignOracleToActivity = async activityId => {
  try {
    const response = await api.delete(`${baseURL}/${activityId}/oracle`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

const getActivity = async activityId => {
  try {
    const response = await api.get(`${baseURL}/${activityId}`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

const deleteEvidence = async (activityId, evidenceId, fileType) => {
  try {
    const response = await api.delete(
      `${baseURL}/${activityId}/evidence/${evidenceId}/${fileType}`
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

const downloadEvidence = async (activityId, evidenceId, fileType) => {
  try {
    const config = { responseType: 'blob' };
    const response = await api.get(
      `${baseURL}/${activityId}/evidence/${evidenceId}/${fileType}`,
      config
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const filename = response.headers.file;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    return response;
  } catch (error) {
    return { error };
  }
};

const completeActivity = async activityId => {
  try {
    const response = api.put(`${baseURL}/${activityId}/status`, {
      status: milestoneActivityStatus.COMPLETED
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const createActivity = async (activity, milestoneId) => {
  try {
    const response = api.post(`${baseURL}`, {
      activity,
      milestoneId
    });

    return response;
  } catch (error) {
    return { error };
  }
};

export {
  updateActivity,
  unassignOracleToActivity,
  getActivity,
  deleteEvidence,
  downloadEvidence,
  completeActivity,
  createActivity
};
