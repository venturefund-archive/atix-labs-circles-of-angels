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
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const assignOracleToActivity = async (userId, activityId) => {
  try {
    console.log(`assigning oracle ${userId} to activity ${activityId}`);
    const response = await api.post(
      `${baseURL}/${activityId}/assignOracle/${userId}`
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

const unassignOracleToActivity = async activityId => {
  try {
    const response = await api.post(`${baseURL}/${activityId}/unassignOracle`);
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
    const response = await api.get(
      `${baseURL}/${activityId}/evidences/${evidenceId}/download/${fileType}`
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

export {
  updateActivity,
  assignOracleToActivity,
  unassignOracleToActivity,
  getActivity,
  deleteEvidence,
  downloadEvidence,
  uploadEvidence,
  completeActivity
};
