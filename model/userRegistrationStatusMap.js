/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const userRegistrationStatusMap = {
  '1': { name: 'Pending approval', color: '' },
  '2': { name: 'Approved', color: 'green' },
  '3': { name: 'Rejected', color: 'red' }
};

export default userRegistrationStatusMap;
