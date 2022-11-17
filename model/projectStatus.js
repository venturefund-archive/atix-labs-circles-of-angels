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
  executing: { name: 'In Progress', color: 'yellow' },
  review: { name: 'In review', color: 'orange' },
  cancel: { name: 'Rejected', color: 'red' },
  finished: { name: 'Completed', color: 'green' }
};

export default projectStatusMap;
