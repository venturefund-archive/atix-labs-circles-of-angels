/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
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
  DRAFT: 'draft',
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

export const SHOW_CLAIM_STATUS = [projectStatuses.EXECUTING, projectStatuses.FINISHED];
export const SHOW_TASK_EVIDENCE_ACTIONS = [projectStatuses.EXECUTING, projectStatuses.FINISHED];
export const SHOW_MILESTONE_STATUS_ACTIONS = [projectStatuses.EXECUTING, projectStatuses.FINISHED];
export const SHOW_BLOCKCHAIN_INFO_STATUS = [
  projectStatuses.FUNDING,
  projectStatuses.EXECUTING,
  projectStatuses.FINISHED,
  projectStatuses.CHANGING_SCOPE,
  projectStatuses.ABORTED
];

export const CURRENCIES = {
  fiat: [
    {
      value: 'USD',
      label: 'USD'
    },
    {
      value: 'EUR',
      label: 'EUR'
    },
    {
      value: 'CHF',
      label: 'CHF'
    },
    {
      value: 'GBP',
      label: 'GBP'
    }
  ],
  crypto: [
    {
      value: 'BTC',
      label: 'BTC'
    },
    {
      value: 'ETH',
      label: 'ETH'
    },
    {
      value: 'USDT',
      label: 'USDT'
    },
    {
      value: 'ETC',
      label: 'ETC'
    }
  ]
};

export const TIMEFRAME_UNITS = [
  {
    label: 'Days',
    value: 'days'
  },
  {
    label: 'Months',
    value: 'months'
  },
  {
    label: 'Years',
    value: 'years'
  }
];

export const ERROR_TYPES = {
  EMPTY: 'EMPTY',
  ALPHANUMERIC: 'ALPHANUMERIC',
  IMAGE_INVALID: 'IMAGE_INVALID',
  FILE: 'FILE',
  MORE_THAN_1_DECIMAL: 'MORE_THAN_1_DECIMAL',
  NO_ZERO: 'NO_ZERO',
  EMPTY_FILE: 'EMPTY_FILE',
  INVALID_FILE: 'INVALID_FILE'
};

export const ERROR_MESSAGES = {
  EMPTY: 'Incomplete required fields',
  ALPHANUMERIC: 'Please input an alphanumeric value for this field.',
  IMAGE_INVALID: 'The uploaded file does not meet the requirements. \n Check them and try again',
  FILE: 'The file is invalid. Review the recommendations and try again',
  MORE_THAN_1_DECIMAL: "This value can't have more than 1 decimals",
  NO_ZERO: "This value can't be zero",
  EMPTY_FILE: '* You must upload the required file before continuing',
  INVALID_FILE: '* The file is invalid. Review the recommendations and try again',
  INVALID_EMAIL: 'The current value is not a valid email',
  NUMBER: 'Input a number value for this field.'
};

export const KB_FACTOR_CONVERTER = 1000;
export const MB_FACTOR_CONVERTER = 1000000;

export const ACCESS_TOKEN_KEY = 'accessToken';
export const USER_KEY = 'user';
