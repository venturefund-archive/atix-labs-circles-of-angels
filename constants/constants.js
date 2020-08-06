/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

export const ENTREPRENEUR = 'entrepreneur';
export const SUPPORTER = 'supporter';

// TODO define role name for funder/oracle user
export const ROLE_LABELS = {
  ENTREPRENEUR: 'Social Entrepreneur',
  SUPPORTER: 'Impact funder'
};

export const PROJECT_FORM_NAMES = {
  THUMBNAILS: 'thumbnails',
  DETAILS: 'details',
  PROPOSAL: 'proposal',
  MILESTONES: 'milestones',
  MAIN: 'main'
};

export const proposalTypeEnum = {
  NEW_MEMBER: 'New Member',
  NEW_DAO: 'New DAO',
  ASSIGN_BANK: 'Assign New Role',
  ASSIGN_CURATOR: 'Assign New Role'
};

export const proposalTypes = {
  NEW_MEMBER: 0,
  NEW_DAO: 1,
  ASSIGN_BANK: 2,
  ASSIGN_CURATOR: 3
};

export const newRolesEnum = {
  ASSIGN_BANK: 'Project Banker',
  ASSIGN_CURATOR: 'Project Curator'
};

export const voteEnum = {
  YES: true,
  NO: false
};

export const publicProjectStatuses = {
  PUBLISHED: 'published',
  CONSENSUS: 'consensus',
  FUNDING: 'funding',
  EXECUTING: 'executing',
  CHANGING_SCOPE: 'changingscope',
  FINISHED: 'finished',
  ABORTED: 'aborted'
};

export const privateProjectStatuses = {
  NEW: 'new',
  TO_REVIEW: 'toreview',
  REJECTED: 'rejected'
};

export const inactiveProjectStatuses = {
  DELETED: 'deleted',
  ARCHIVED: 'archived',
  CANCELLED: 'cancelled'
  // TODO this status might be a boolean field in project table
  // SUSPENDED: 'suspended'
};

export const projectStatuses = {
  ...privateProjectStatuses,
  ...publicProjectStatuses,
  ...inactiveProjectStatuses
};

export const supporterRoles = {
  ORACLES: 'oracles',
  FUNDERS: 'funders'
};

export const claimMilestoneStatus = {
  PENDING: 'pending',
  CLAIMABLE: 'claimable',
  CLAIMED: 'claimed',
  TRANSFERRED: 'transferred'
};

export const SHOW_EXPERIENCES_STATUSES = [
  projectStatuses.CONSENSUS,
  projectStatuses.EXECUTING,
  projectStatuses.FUNDING,
  projectStatuses.FINISHED,
  projectStatuses.CHANGING_SCOPE,
  projectStatuses.ABORTED
];

export const SHOW_FUNDS_STATUSES = [
  projectStatuses.EXECUTING,
  projectStatuses.FUNDING,
  projectStatuses.FINISHED,
  projectStatuses.CHANGING_SCOPE,
  projectStatuses.ABORTED
];

export const SHOW_CLAIM_STATUS = [
  projectStatuses.EXECUTING,
  projectStatuses.FINISHED
];
export const SHOW_TASK_EVIDENCE_ACTIONS = [
  projectStatuses.EXECUTING,
  projectStatuses.FINISHED
];
export const SHOW_MILESTONE_STATUS_ACTIONS = [
  projectStatuses.EXECUTING,
  projectStatuses.FINISHED
];
export const SHOW_BLOCKCHAIN_INFO_STATUS = [
  projectStatuses.FUNDING,
  projectStatuses.EXECUTING,
  projectStatuses.FINISHED,
  projectStatuses.CHANGING_SCOPE,
  projectStatuses.ABORTED
];
