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

export const projectStatuses = {
  NEW: 'new',
  TO_REVIEW: 'toreview',
  REJECTED: 'rejected',
  DELETED: 'deleted',
  PUBLISHED: 'published',
  CONSENSUS: 'consensus',
  FUNDING: 'funding',
  EXECUTING: 'executing',
  CHANGING_SCOPE: 'changingscope',
  FINISHED: 'finished',
  ABORTED: 'aborted',
  ARCHIVED: 'archived',
  CANCELLED: 'cancelled'
};

export const supporterRoles = {
  ORACLE: 'oracle',
  FUNDER: 'funder'
};

export const claimMilestoneStatus = {
  PENDING: 'pending',
  CLAIMABLE: 'claimable',
  CLAIMED: 'claimed',
  TRANSFERRED: 'transferred'
};
