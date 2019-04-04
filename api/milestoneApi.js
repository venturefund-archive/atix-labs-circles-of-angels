import api from './api';

const baseURL = '/milestones';

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

export { deleteMilestone, deleteActivity };
