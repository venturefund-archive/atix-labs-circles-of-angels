/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api, { doGet, doPost, doPut } from './api';
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
    return response.data.bankAccount;
  } catch (error) {
    return error.message;
  }
};

const getTransferStatus = async ({ userId, projectId }) => {
  try {
    const response = await api.get(
      `${baseURL}/user/${userId}/project/${projectId}/state`
    );
    return response.data.state;
  } catch (error) {
    return error.message;
  }
};

export const getTransferListOfProject = projectId =>
  apiCall('get', `/projects/${projectId}${baseURL}`);

export const getFundedAmount = projectId =>
  doGet(`/projects/${projectId}${baseURL}/funded-amount`);

export const createTransfer = (projectId, transfer) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return doPost(`/projects/${projectId}${baseURL}`, transfer, config);
};

export const updateStateOfTransference = (transferId, state) =>
  apiCall('put', `${baseURL}/${transferId}`, { state });

export const addTransferClaimGetTransaction = (transferId, approved) =>
  approved
    ? doGet(`${baseURL}/${transferId}/claim/approved/get-transaction`)
    : doGet(`${baseURL}/${transferId}/claim/disapproved/get-transaction`);

export const addTransferClaimSendTransaction = (transferId, approved, data) =>
  approved
    ? doPut(`${baseURL}/${transferId}/claim/approved/send-transaction`, data)
    : doPut(
        `${baseURL}/${transferId}/claim/disapproved/send-transaction`,
        data
      );

export const getTransferBlockchainData = transferId =>
  doGet(`${baseURL}/${transferId}/blockchain-data`);

export {
  sendTransferInformation,
  getTransferDestinationInfo,
  getTransferStatus
};
