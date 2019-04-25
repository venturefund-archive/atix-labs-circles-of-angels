import api from './api';

const baseURL = 'milestones';
const restActivityBasePath = 'activity';

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

const getAllMilestones = async () => {
  try {
    const response = await api.get(`${baseURL}`);
    return response;
  } catch (error) {
    return { error };
  }
};

const getAllBudgetStatus = async () => {
  try {
    const response = await api.get(`${baseURL}/budgetStatus`);
    return response;
  } catch (error) {
    return { error };
  }
};

const changeBudgetStatus = async (milestoneId, budgetStatusId) => {
  try {
    const response = await api.put(`${baseURL}/${milestoneId}/budgetStatus`, {
      budgetStatusId
    });
    return response;
  } catch (error) {
    return { error };
  }
};

export {
  updateMilestone,
  deleteMilestone,
  deleteActivity,
  getAllMilestones,
  getAllBudgetStatus,
  changeBudgetStatus
};
