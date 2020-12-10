/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders
 * and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const projectStatusesTransitionAdmin = {
  new: ['toreview'],
  toreview: [],
  consensus: ['funding'],
  funding: ['executing', 'consensus'],
  executing: ['aborted'],
  rejected: ['toreview'],
  finished: [],
  deleted: [],
  aborted: [],
  published: [],
  changingscope: [],
  archived: [],
  cancelled: []
};

export default projectStatusesTransitionAdmin;
