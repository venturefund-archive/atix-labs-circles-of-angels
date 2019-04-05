import api from './api';

const baseURL = 'activity';

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

export { updateActivity };
