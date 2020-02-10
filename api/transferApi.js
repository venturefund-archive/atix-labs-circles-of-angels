/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api, { doPost } from './api';
import apiCall from './apiCall';

const baseURL = '/transfers';

const sendTransferInformation = async ({
  transferId,
  amount,
  currency,
  senderId,
  projectId,
  destinationAccount
}) => {
  console.log('Sending trasfer info to verificate');
  try {
    const response = await api.post(`${baseURL}`, {
      amount,
      currency,
      transferId,
      senderId,
      projectId,
      destinationAccount
    });
    return response;
  } catch (error) {
    return { error };
  }
};

const getTransferDestinationInfo = async () => {
  try {
    const response = await api.get('/general/accountDestination');
    console.log('Geting transfer destination data');
    return response.data.bankAccount;
  } catch (error) {
    return error.menssage;
  }
};

const getTransferStatus = async ({ userId, projectId }) => {
  try {
    const response = await api.get(
      `${baseURL}/user/${userId}/project/${projectId}/state`
    );
    console.log(response);
    return response.data.state;
  } catch (error) { }
};

const getTransferListOfProject = projectId =>
  apiCall('get', `/projects/${projectId}${baseURL}`);

const createTransfer = (projectId, transfer) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPost(`/projects/${projectId}${baseURL}`, transfer, config);
};

const updateStateOfTransference = (transferId, state) =>
  apiCall('put', `${baseURL}/${transferId}`, { state });

const addApprovedTransferClaim = transferId =>
  doPost(`${baseURL}/${transferId}/claim/approved`);

const addDisapprovedTransferClaim = (transferId, data) =>
  doPost(`${baseURL}/${transferId}/claim/disapproved`, data);

export {
  sendTransferInformation,
  getTransferDestinationInfo,
  getTransferStatus,
  getTransferListOfProject,
  updateStateOfTransference,
  createTransfer,
  addApprovedTransferClaim,
  addDisapprovedTransferClaim
};
