import api from "./api";

const getProjects = async () => {
  try {
    const response = await api.get(`/project/getProjects`);
    let projects = response.data;
    if (!projects) return [];
    return projects;
  } catch (error) {
    return [];
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
