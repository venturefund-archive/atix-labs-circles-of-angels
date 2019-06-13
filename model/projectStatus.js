/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const projectStatusMap = {
  '1': { name: 'Cancelled', color: 'red' },
  '0': { name: 'Pending approval', color: '' },
  '2': { name: 'Published', color: 'green' },
  '3': { name: 'In Progress', color: 'green' }
};

export default projectStatusMap;
