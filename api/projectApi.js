/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import { isEmpty } from 'lodash';
import apiCall from './apiCall';
import api, { doGet, doPost, doPut, doDelete } from './api';
import ProjectStatus from '../constants/ProjectStatus';
import { useGet } from '../hooks/useRequest';

const projectsBaseURL = '/projects';

export const getProjects = () => apiCall('get', `${projectsBaseURL}`);

export const getFundingProjects = () => doGet(`${projectsBaseURL}/funding`);

export const createProjectThumbnail = saveData => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPost(`${projectsBaseURL}/description`, saveData, config);
};

export const createProject = () => apiCall('post', `${projectsBaseURL}`);

export const putBasicInformation = (projectId, saveData) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPut(`${projectsBaseURL}/${projectId}/basic-information`, saveData, config);
};

export const updateProjectThumbnail = (projectId, saveData) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPut(`${projectsBaseURL}/${projectId}/description`, saveData, config);
};

export const updateProjectDetail = (projectId, saveData) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPut(`${projectsBaseURL}/${projectId}/details`, saveData, config);
};

export const updateProjectProposal = (projectId, saveData) =>
  doPut(`${projectsBaseURL}/${projectId}/proposal`, saveData);

export const processProjectMilestones = (projectId, saveData) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPut(`${projectsBaseURL}/${projectId}/milestones`, saveData, config);
};

export const getProjectMilestones = projectId =>
  doGet(`${projectsBaseURL}/${projectId}/milestones`);

export const getProject = async projectId => doGet(`${projectsBaseURL}/${projectId}`);

export const useGetPublicProjects = () => {
  const [{ data, isLoading, isError }] = useGet('/projects/public');
  return [data, isLoading, isError];
};

export const getProjectUsers = projectId => doGet(`${projectsBaseURL}/${projectId}/users`);

export const getProjectTransactions = (projectId, type) =>
  doGet(`${projectsBaseURL}/${projectId}/transactions?type=${type}`);

export const getFeaturedProjects = async () => apiCall('get', `${projectsBaseURL}/featured`);

export const sendToReview = projectId => doPut(`${projectsBaseURL}/${projectId}/in-review`);

export const publish = projectId => doPut(`${projectsBaseURL}/${projectId}/publish`);

export const addProjectExperience = (projectId, experienceData) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPost(`${projectsBaseURL}/${projectId}/experiences`, experienceData, config);
};

export const getProjectExperiences = async projectId =>
  doGet(`${projectsBaseURL}/${projectId}/experiences`);

export const deleteProject = async projectId => doDelete(`${projectsBaseURL}/${projectId}`);

export const getChangelog = async (projectId, values) => {
  const params = {};
  if (values.milestoneId) params.milestoneId = values.milestoneId;
  if (values.activityId) params.activityId = values.activityId;
  if (values.revisionId) params.revisionId = values.revisionId;
  if (values.evidenceId) params.evidenceId = values.evidenceId;
  if (values.userId) params.userId = values.userId;

  return doGet(`${projectsBaseURL}/${projectId}/changelog`, undefined, { params });
};

export const useGetProjects = () => {
  const [{ data, isLoading, isError }] = useGet('/projects');
  return [data, isLoading, isError];
};

export const getProjectBlockchainData = projectId =>
  doGet(`${projectsBaseURL}/${projectId}/blockchain-data`);

const getActiveProjects = async () => {
  try {
    const response = await api.get(`${projectsBaseURL}/active`);
    return response;
  } catch (error) {
    return { error };
  }
};

const getProjectsPreview = async () => {
  try {
    const response = await api.get(`${projectsBaseURL}/preview`);
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
    const response = await api.put(`${projectsBaseURL}/${projectId}`, fd);
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
    const response = await api.put(`${projectsBaseURL}/${projectId}`, fd);
    return response;
  } catch (error) {
    return { error };
  }
};

const updateProjectStatus = async (projectId, data) =>
  apiCall('put', `${projectsBaseURL}/${projectId}/status`, data);

const downloadAgreement = async projectId => {
  try {
    const config = { responseType: 'blob' };
    const response = await api.get(`${projectsBaseURL}/${projectId}/agreement`, config);

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
    const response = await api.get(`${projectsBaseURL}/${projectId}/proposal`, config);

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

    const response = await api.post(`${projectsBaseURL}/${projectId}/agreement`, fd, config);

    return response;
  } catch (error) {
    return { error };
  }
};

const downloadMilestonesTemplate = async () => {
  const config = { responseType: 'blob' };
  const response = await doGet('files/milestones/template', undefined, config);

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
    const response = await api.get(`${projectsBaseURL}/templates/proposal`, config);

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
    const response = await api.put(`${projectsBaseURL}/${projectId}`, fd);
    return response;
  } catch (error) {
    return { error };
  }
};

const getProjectsAsOracle = async oracleId => {
  try {
    const response = await api.get(`/oracles/${oracleId}${projectsBaseURL}`);
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

    const response = await api.put(`${projectsBaseURL}/${projectId}`, fd, config);
    return response;
  } catch (error) {
    return { error };
  }
};

const createProjectExperience = async (experience, photos) => {
  try {
    const originPhotos = photos.map(photo => photo.originFileObj);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const fd = new FormData();
    fd.append('experience', JSON.stringify(experience));
    originPhotos.forEach((photo, i) => {
      fd.append(`photo-${i}`, photo);
    });
    const response = await api.post(
      `${projectsBaseURL}/${experience.projectId}/experiences`,
      fd,
      config
    );

    return response;
  } catch (error) {
    return { error };
  }
};

const cloneProject = async projectId => {
  try {
    const response = await api.post(`${projectsBaseURL}/${projectId}/clone`);
    return response;
  } catch (error) {
    return { error };
  }
};

const cancelReview = async projectId => {
  try {
    const response = await api.put(`${projectsBaseURL}/${projectId}/cancel-review`);
    return response;
  } catch (error) {
    return { error };
  }
};

const approveCloneProject = async(projectId) => {
  try {
    const response = await api.put(`${projectsBaseURL}/${projectId}/review`, { approved: true });
    return response;
  } catch (error) {
    return { error };
  }
}

const rejectCloneProject = async(projectId) => {
  try {
    const response = await api.put(`${projectsBaseURL}/${projectId}/review`, { approved: false });
    return response;
  } catch (error) {
    return { error };
  }
}

export {
  getActiveProjects,
  confirmProject,
  rejectProject,
  updateProjectStatus,
  downloadAgreement,
  uploadAgreement,
  downloadProposal,
  downloadMilestonesTemplate,
  startProject,
  getProjectsAsOracle,
  downloadProposalTemplate,
  updateProject,
  createProjectExperience,
  getProjectsPreview,
  cloneProject,
  cancelReview,
  approveCloneProject,
  rejectCloneProject
};
