import api from './api';

const baseURL = '/project';

const createProject = async (project, files) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  const fd = new FormData();
  try {
    fd.append('projectProposal', files[0]);
    fd.append('projectCoverPhoto', files[1]);
    fd.append('projectCardPhoto', files[2]);
    fd.append('projectMilestones', files[3]);
    fd.append('project', JSON.stringify(project));

    console.log('Sending information', fd);

    const response = await api.post(`${baseURL}/create`, fd, config);

    return response;
  } catch (error) {
    return { error };
  }
};

const getProjects = async () => {
  try {
    const response = await api.get(`${baseURL}/getProjects`);
    return response;
  } catch (error) {
    return { error };
  }
};

// ** NOT USED **
const uploadProject = async files => {
  console.log('Sending files: ', files);

  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  const fd = new FormData();
  try {
    fd.append('projectXls', files[0]);
    fd.append('projectCoverPhoto', files[1]);
    fd.append('projectCardPhoto', files[2]);
    fd.append('projectMilestones', files[3]);

    const response = await api.post('/project/upload', fd, config);

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

const getProjectMilestones = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}/getMilestones`);
    return response;
  } catch (error) {
    return { error };
  }
};

const downloadAgreement = async projectId => {
  try {
    const config = { responseType: 'blob' };
    const response = await api.get(
      `${baseURL}/${projectId}/downloadAgreement`,
      config
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'agreement.pdf');
    document.body.appendChild(link);
    link.click();

    return response;
  } catch (error) {
    return { error };
  }
};

const uploadAgreement = async (projectId, agreementFile) => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const fd = new FormData();
    fd.append('projectAgreement', agreementFile);

    const response = await api.post(
      `${baseURL}/${projectId}/uploadAgreement`,
      fd,
      config
    );

    return response;
  } catch (error) {
    return { error };
  }
};

export {
  getProjects,
  getProject,
  confirmProject,
  getProjectMilestones,
  createProject,
  downloadAgreement,
  uploadAgreement
};
