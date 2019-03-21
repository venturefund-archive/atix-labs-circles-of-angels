import api from './api';

const baseURL = '/userProject';

const getUsers = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}/getUsers`);
    return response;
  } catch (error) {
    return { error };
  }
};

const signAgreement = async (userId, projectId) => {
  try {
    const response = await api.get(
      `${baseURL}/${userId}/${projectId}/signAgreement`
    );
    return response;
  } catch (error) {
    return { error };
  }
}
export { getUsers, signAgreement };
