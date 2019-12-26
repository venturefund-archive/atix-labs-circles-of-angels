/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import { isEmpty } from 'lodash';
import api from './api';
import apiCall from './apiCall';
import ProjectStatus from '../constants/ProjectStatus';
import useRequest, { useGet, usePost } from '../hooks/useRequest';

const baseURL = '/projects';

// const createProject = async (project, files, ownerId) => {
//   const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//   const fd = new FormData();
//   try {
//     fd.append('projectProposal', files[0]);
//     fd.append('projectCoverPhoto', files[1]);
//     fd.append('projectCardPhoto', files[2]);
//     fd.append('projectMilestones', files[3]);
//     fd.append('projectAgreement', files[4]);
//     fd.append('project', JSON.stringify(project));
//     fd.append('ownerId', ownerId);

//     const response = await api.post(`${baseURL}`, fd, config);

//     return response;
//   } catch (error) {
//     return { error };
//   }
// };

export const createProjectRequest = data => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return {
    method: 'post',
    url: '/projects/description',
    data,
    config
  };
};

// const getProjects = async () => {
//   try {
//     const response = await api.get(`${baseURL}`);
//     return response;
//   } catch (error) {
//     return { error };
//   }
// };

export const useGetProjects = () => {
  const [{ data, isLoading, isError }] = useGet('/projects');
  return [data, isLoading, isError];
};

const getActiveProjects = async () => {
  try {
    const response = await api.get(`${baseURL}/active`);
    return response;
  } catch (error) {
    return { error };
  }
};

const getProjectsPreview = async () => {
  try {
    const response = await api.get(`${baseURL}/preview`);
    return response;
  } catch (error) {
    return { error };
  }
};

const getProject = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}`);
    return response;
  } catch (error) {
    return { error };
  }
};

const confirmProject = async projectId => {
  try {
    const fd = new FormData();
    fd.append(
      'project',
      JSON.stringify({
        status: ProjectStatus.PUBLISHED
      })
    );
    const response = await api.put(`${baseURL}/${projectId}`, fd);
    return response;
  } catch (error) {
    return { error };
  }
};

const rejectProject = async projectId => {
  try {
    const fd = new FormData();
    fd.append(
      'project',
      JSON.stringify({
        status: ProjectStatus.REJECTED
      })
    );
    const response = await api.put(`${baseURL}/${projectId}`, fd);
    return response;
  } catch (error) {
    return { error };
  }
};

const updateProjectStatus = async (projectId, status) =>
  apiCall('put', `${baseURL}/${projectId}/status`, { status });

const getProjectMilestones = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}/milestones`);
    return response;
  } catch (error) {
    return { error };
  }
};

const downloadProjectMilestonesFile = async projectId => {
  try {
    const config = { responseType: 'blob' };
    const response = await api.get(
      `${baseURL}/${projectId}/milestonesFile`,
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
    const response = await api.get(`${baseURL}/${projectId}/agreement`, config);

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
    const response = await api.get(`${baseURL}/${projectId}/proposal`, config);

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
      `${baseURL}/${projectId}/agreement`,
      fd,
      config
    );

    return response;
  } catch (error) {
    return { error };
  }
};

const downloadMilestonesTemplate = async () => {
  const config = { responseType: 'blob' };
  const response = await api.get(`${baseURL}/templates/milestones`, config);

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  const filename = response.headers.file;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  return response;
};

const downloadProposalTemplate = async () => {
  try {
    const config = { responseType: 'blob' };
    const response = await api.get(`${baseURL}/templates/proposal`, config);

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

const startProject = async projectId => {
  try {
    const fd = new FormData();
    fd.append(
      'project',
      JSON.stringify({
        status: ProjectStatus.IN_PROGRESS
      })
    );
    const response = await api.put(`${baseURL}/${projectId}`, fd);
    return response;
  } catch (error) {
    return { error };
  }
};

const getProjectsAsOracle = async oracleId => {
  try {
    const response = await api.get(`/oracles/${oracleId}${baseURL}`);
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
      `${baseURL}/${experience.projectId}/experiences`,
      fd,
      config
    );

    return response;
  } catch (error) {
    return { error };
  }
};

export {
  getActiveProjects,
  getProject,
  confirmProject,
  rejectProject,
  updateProjectStatus,
  getProjectMilestones,
  downloadProjectMilestonesFile,
  downloadAgreement,
  uploadAgreement,
  downloadProposal,
  downloadMilestonesTemplate,
  startProject,
  getProjectsAsOracle,
  downloadProposalTemplate,
  updateProject,
  getProjectExperiences,
  createProjectExperience,
  getProjectsPreview
};
