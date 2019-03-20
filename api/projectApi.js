import api from "./api";

const baseURL = "/project";

const getProjects = async () => {
  try {
    const response = await api.get(`${baseURL}/getProjects`);
    return response;
  } catch (error) {
    return { error };
  }
};

const getProject = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}/getProject`);
    return response;
  } catch (error) {
    return { error };
  }
};

const confirmProject = async projectId => {
  try {
    const response = await api.post(`${baseURL}/${projectId}/updateStatus`, {
      status: 1
    });
    return response;
  } catch (error) {
    return { error };
  }
};
export { getProjects, getProject, confirmProject };
