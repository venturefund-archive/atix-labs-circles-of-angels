/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api from './api';

const baseURL = 'activities';

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

const assignOracleToActivity = async (userId, activityId) => {
  try {
    const response = await api.put(
      `${baseURL}/${activityId}/assignOracle/${userId}`
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

const unassignOracleToActivity = async activityId => {
  try {
    const response = await api.delete(
      `${baseURL}/${activityId}/unassignOracle`
    );
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
      `${baseURL}/${activityId}/evidences/${evidenceId}/${fileType}`
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
      `${baseURL}/${activityId}/evidences/${evidenceId}/download/${fileType}`,
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

const uploadEvidence = async (activityId, files) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const fd = new FormData();
  try {
    files.forEach(file => fd.append('evidenceFiles', file));
    console.log('Sending information', fd);
    const response = await api.post(
      `${baseURL}/${activityId}/evidences`,
      fd,
      config
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

const completeActivity = async activityId => {
  try {
    const response = api.post(`${baseURL}/${activityId}/complete`);
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
  assignOracleToActivity,
  unassignOracleToActivity,
  getActivity,
  deleteEvidence,
  downloadEvidence,
  uploadEvidence,
  completeActivity,
  createActivity
};
