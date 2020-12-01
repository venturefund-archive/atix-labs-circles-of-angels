/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const transferStatusMap = {
  '3': {
    name: 'cancel',
    show: 'Cancelled',
    icon: './static/images/icon-cancel.svg',
    theme: 'theme-cancel'
  },
  '0': {
    name: 'pending',
    show: 'Pending Verification',
    icon: './static/images/icon-clock.svg',
    theme: 'theme-pending'
  },
  '1': {
    name: 'pending',
    show: 'Reconciliation',
    icon: './static/images/icon-clock.svg',
    theme: 'theme-pending'
  },
  '2': {
    name: 'success',
    show: 'Verified',
    icon: './static/images/icon-check.svg',
    theme: 'theme-success'
  }
};

export default transferStatusMap;
