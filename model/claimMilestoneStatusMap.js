/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const claimMilestoneStatusMap = {
  pending: { name: 'Pending', color: 'magenta' },
  claimable: { name: 'Claimable', color: 'blue' },
  claimed: { name: 'Claimed', color: 'purple' },
  transferred: { name: 'Transferred', color: 'green' }
};

export default claimMilestoneStatusMap;
