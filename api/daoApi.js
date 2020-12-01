/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

// import api, { doGet } from './api';
import { doGet, doPost, doPut } from './api';

const baseURL = '/daos';

const getDaos = () => doGet(`${baseURL}`);

const getProposalsByDaoId = daoId => doGet(`${baseURL}/${daoId}/proposals`);

const getAllUsers = () => doGet(`${baseURL}/users`);

const getDaoUsers = daoId => doGet(`${baseURL}/users/${daoId}`);

const createNewMemberProposal = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/proposals/member`, data);

const voteProposal = (daoId, proposalId, data) =>
  doPut(`${baseURL}/${daoId}/proposals/${proposalId}/vote`, data);

const uploadProcessGetTransaction = (daoId, proposalId) =>
  doPost(`${baseURL}/${daoId}/process-proposal/${proposalId}/get-transaction`);

const uploadProcessSendTransaction = (daoId, proposalId, data) =>
  doPost(
    `${baseURL}/${daoId}/process-proposal/${proposalId}/send-transaction`,
    data
  );

const uploadVoteGetTransaction = (daoId, proposalId, data) =>
  doPost(`${baseURL}/${daoId}/proposal/${proposalId}/get-transaction`, data);

const uploadVoteSendTransaction = (daoId, proposalId, data) =>
  doPost(`${baseURL}/${daoId}/proposal/${proposalId}/send-transaction`, data);

const uploadMemberProposalGetTransaction = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/proposal/new-member/get-transaction`, data);

const uploadDaoProposalGetTransaction = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/proposal/new-dao/get-transaction`, data);

const uploadRoleBankProposalGetTransaction = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/proposal/new-bank/get-transaction`, data);

const uploadRoleCuratorProposalGetTransaction = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/proposal/new-curator/get-transaction`, data);

const uploadProposalSendTransaction = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/proposal/send-transaction`, data);

export {
  getDaos,
  getProposalsByDaoId,
  createNewMemberProposal,
  voteProposal,
  uploadMemberProposalGetTransaction,
  uploadDaoProposalGetTransaction,
  uploadRoleBankProposalGetTransaction,
  uploadRoleCuratorProposalGetTransaction,
  uploadProposalSendTransaction,
  uploadVoteGetTransaction,
  uploadVoteSendTransaction,
  uploadProcessGetTransaction,
  uploadProcessSendTransaction,
  getDaoUsers,
  getAllUsers
};
