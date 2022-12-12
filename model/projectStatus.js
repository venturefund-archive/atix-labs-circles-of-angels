/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const projectStatusMap = {
  draft: { name: 'Draft', color: 'gray' },
  'in progress': { name: 'In Progress', color: 'yellow' },
  'in review': { name: 'In review', color: 'violet' },
  canceled: { name: 'Canceled', color: 'red' },
  completed: { name: 'Completed', color: 'green' },
  published: { name: 'Published', color: 'blue' }
};

export default projectStatusMap;
