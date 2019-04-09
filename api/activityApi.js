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

export { updateActivity, assignOracleToActivity, unassignOracleToActivity };
