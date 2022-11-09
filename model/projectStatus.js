/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const projectStatusMap = {
  draft: { name: 'Draft', color: 'blue' },
  toreview: { name: 'To Review' },
  rejected: { name: 'Rejected', color: 'red' },
  deleted: { name: 'Deleted', color: 'red' },
  published: { name: 'Published', color: 'green' },
  consensus: { name: 'Consensus', color: 'gold' },
  funding: { name: 'Funding', color: 'blue' },
  executing: { name: 'Executing', color: 'green' },
  changingscope: { name: 'Changing Scope', color: 'gold' },
  finished: { name: 'Finished', color: 'green' },
  aborted: { name: 'Aborted', color: 'red' },
  archived: { name: 'Archived', color: 'green' },
  cancelled: { name: 'Cancelled', color: 'red' }
};

export default projectStatusMap;
