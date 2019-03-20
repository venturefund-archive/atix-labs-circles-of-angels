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
    const response = await api.get(`/project/${projectId}/getProject`);
    let project = response.data;
    return project;
  } catch (error) {
    return null;
  }
};
export { getProjects, getProject };
