/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

export const PROJECT_STATUS_ENUM = {
  DRAFT: 'draft',
  IN_PROGRESS: 'in progress',
  IN_REVIEW: 'in review',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
  PUBLISHED: 'published',
  OPEN_REVIEW: 'open review'
};

export const PROJECT_STATUS_MAP = {
  draft: { name: 'Draft', color: 'gray' },
  'in progress': { name: 'In Progress', color: 'yellow' },
  'in review': { name: 'In review', color: 'violet' },
  canceled: { name: 'Canceled', color: 'red' },
  completed: { name: 'Completed', color: 'green' },
  published: { name: 'Published', color: 'blue' }
};
