import api from './api';

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

    const response = await api.post('/project/create', fd, config);

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

export { uploadProject, createProject };
