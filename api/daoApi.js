/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

// import api, { doGet } from './api';
import { doGet, doPost, doPut } from './api';

const baseURL = '/daos';

const getDaos = () => doGet(`${baseURL}`);

const getProposalsByDaoId = daoId => doGet(`${baseURL}/${daoId}/proposals`);

const createNewMemberProposal = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/proposals/member`, data);

const voteProposal = (daoId, proposalId, data) =>
  doPut(`${baseURL}/${daoId}/proposals/${proposalId}/vote`, data);

const uploadProposalGetTransaction = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/get-transaction`, data);

const uploadProposalSendTransaction = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/send-transaction`, data);

export {
  getDaos,
  getProposalsByDaoId,
  createNewMemberProposal,
  voteProposal,
  uploadProposalGetTransaction,
  uploadProposalSendTransaction
};
