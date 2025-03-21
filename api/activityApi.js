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

export const updateTask = (taskId, saveData) => doPut(`${baseURL}/${taskId}`, saveData);

export const deleteTask = taskId => doDelete(`${baseURL}/${taskId}`);

export const createTask = (milestoneId, taskData) =>
  doPost(`/milestones/${milestoneId}${baseURL}`, taskData);

export const assignOracleToActivity = (taskId, oracleId) =>
  doPut(`${baseURL}/${taskId}/assign-oracle`, { oracleId });

export const uploadEvidenceGetTransaction = (taskId, data, status) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPost(`${baseURL}/${taskId}/claim/${status}/get-transaction`, data, config);
};

export const uploadEvidenceSendTransaction = (taskId, data, status) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPost(`${baseURL}/${taskId}/claim/${status}/send-transaction`, data, config);
};

export const getEvidences = taskId => doGet(`${baseURL}/${taskId}/claims`);
export const getActivityEvidences = activityId => doGet(`${baseURL}/${activityId}/evidences`);

const getEvidence = evidenceId => doGet(`/evidences/${evidenceId}`);
const updateEvidenceStatus = (evidenceId, status, reason) =>
  doPut(`/evidences/${evidenceId}`, { status, reason });

export const getEvidenceBlockchainData = evidenceId =>
  doGet(`/evidences/${evidenceId}/blockchain-data`);

const updateActivity = async (activityId, updatedActivity) => {
  try {
    const response = await api.put(`${baseURL}/${activityId}`, updatedActivity);
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

const updateActivityStatus = async (activityId, status, txId, reason = '') => {
  try {
    const response = api.put(`${baseURL}/${activityId}/status`, {
      status,
      reason,
      txId
    });
    return response;
  } catch (error) {
    return error;
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

const createEvidence = async (activityId, data) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const fd = new FormData();
  fd.append('title', data.title);
  fd.append('type', data.type);
  fd.append('description', data.description);
  fd.append('amount', data.amount);

  if (data.files.length > 0) {
    data.files.forEach((file, index) => {
      fd.append(`file-${index}`, file);
    });
  }

  if (data.transferTxHash.length > 0) {
    fd.append('transferTxHash', data.transferTxHash);
  }

  return doPost(`${baseURL}/${activityId}/evidences`, fd, config);
};

const signActivity = ({ activityId, authorizationSignature }) =>
  doPost(`${baseURL}/${activityId}/signature`, { authorizationSignature });

export {
  updateActivity,
  unassignOracleToActivity,
  getActivity,
  deleteEvidence,
  downloadEvidence,
  completeActivity,
  createActivity,
  createEvidence,
  getEvidence,
  updateEvidenceStatus,
  updateActivityStatus,
  signActivity
};
