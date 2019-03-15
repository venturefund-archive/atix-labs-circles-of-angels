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

export { getProjects };
