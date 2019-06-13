/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const MilestoneBudgetStatusMap = {
  '1': { name: 'Claimable', color: 'yellow' },
  '2': { name: 'Claimed', color: 'blue' },
  '3': { name: 'Funded', color: 'green' },
  '4': { name: 'Blocked', color: 'orange' }
};

export default MilestoneBudgetStatusMap;
