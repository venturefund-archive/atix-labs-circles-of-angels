/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import { isEmpty } from 'lodash';
import api from './api';
import ProjectStatus from '../constants/ProjectStatus';

const baseURL = '/project';

const createProject = async (project, files, ownerId) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  const fd = new FormData();
  try {
    fd.append('projectProposal', files[0]);
    fd.append('projectCoverPhoto', files[1]);
    fd.append('projectCardPhoto', files[2]);
    fd.append('projectMilestones', files[3]);
    fd.append('projectAgreement', files[4]);
    fd.append('project', JSON.stringify(project));
    fd.append('ownerId', ownerId);

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

const getActiveProjects = async () => {
  try {
    const response = await api.get(`${baseURL}/getActiveProjects`);
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
      status: ProjectStatus.PUBLISHED
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const rejectProject = async projectId => {
  try {
    const response = await api.post(`${baseURL}/${projectId}/updateStatus`, {
      status: ProjectStatus.REJECTED
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

const downloadProjectMilestonesFile = async projectId => {
  try {
    const config = { responseType: 'blob' };
    const response = await api.get(
      `${baseURL}/${projectId}/getMilestonesFile`,
      config
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const filename = response.headers.file;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

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
    const filename = response.headers.file;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    return response;
  } catch (error) {
    return { error };
  }
};

const downloadProposal = async projectId => {
  try {
    const config = {
      responseType: 'blob'
    };
    const response = await api.get(
      `${baseURL}/${projectId}/downloadProposal`,
      config
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    const filename = response.headers.file;
    link.setAttribute('download', filename);
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

const downloadMilestonesTemplate = async () => {
  try {
    const config = { responseType: 'blob' };
    const response = await api.get(
      `${baseURL}/downloadMilestonesTemplate`,
      config
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const filename = response.headers.file;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    return response;
  } catch (error) {
    return { error };
  }
};

const downloadProposalTemplate = async () => {
  try {
    const config = { responseType: 'blob' };
    const response = await api.get(`${baseURL}/proposalTemplate`, config);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const filename = response.headers.file;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    return response;
  } catch (error) {
    return { error };
  }
};

const getActualProjectAmount = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}/alreadyFunded`);
    return response;
  } catch (error) {
    return { error };
  }
};

const startProject = async projectId => {
  try {
    const response = await api.put(`${baseURL}/${projectId}/start`);
    return response;
  } catch (error) {
    return { error };
  }
};

const getProjectsAsOracle = async oracleId => {
  try {
    const response = await api.get(`${baseURL}/oracle/${oracleId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

const updateProject = async (project, coverPhoto, cardPhoto, projectId) => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const fd = new FormData();
    if (cardPhoto && !isEmpty(cardPhoto)) {
      fd.append('projectCardPhoto', cardPhoto);
    }
    if (coverPhoto && !isEmpty(coverPhoto)) {
      fd.append('projectCoverPhoto', coverPhoto);
    }
    fd.append('project', JSON.stringify(project));

    const response = await api.put(`${baseURL}/${projectId}`, fd, config);
    return response;
  } catch (error) {
    return { error };
  }
};

const getProjectExperiences = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}/experiences`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

const createProjectExperience = async (experience, photos) => {
  try {
    photos = photos.map(photo => photo.originFileObj);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const fd = new FormData();
    fd.append('experience', JSON.stringify(experience));
    photos.forEach((photo, i) => {
      fd.append(`photo-${i}`, photo);
    });
    const response = await api.post(
      `${baseURL}/${experience.projectId}/experience`,
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
  getActiveProjects,
  getProject,
  confirmProject,
  rejectProject,
  getProjectMilestones,
  createProject,
  downloadProjectMilestonesFile,
  downloadAgreement,
  uploadAgreement,
  downloadProposal,
  downloadMilestonesTemplate,
  getActualProjectAmount,
  startProject,
  getProjectsAsOracle,
  downloadProposalTemplate,
  updateProject,
  getProjectExperiences,
  createProjectExperience
};
