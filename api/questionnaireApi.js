import api from './api';

const baseURL = 'questionnaire';

const getQuestionnaire = async roleId => {
  try {
    const response = await api.get(`${baseURL}/${roleId}`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

export { getQuestionnaire };
