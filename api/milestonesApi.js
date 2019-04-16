import api from './api';

const baseURL = 'milestones';

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

    const milestone = {
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
    };

    const response = await api.put(`${baseURL}/${id}`, {
      milestone
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

    const response = await api.delete(`${baseURL}/activity/${activityId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

export { updateMilestone, deleteMilestone, deleteActivity };
