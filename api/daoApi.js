/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

// import api, { doGet } from './api';
import { doGet, doPost } from './api';

const baseURL = '/daos';

const getDaos = () => doGet(`${baseURL}`);

const getProposalsByDaoId = daoId => doGet(`${baseURL}/${daoId}/proposals`);

const createNewMemberProposal = (daoId, data) =>
  doPost(`${baseURL}/${daoId}/proposals/member`, data);

export { getDaos, getProposalsByDaoId, createNewMemberProposal };
