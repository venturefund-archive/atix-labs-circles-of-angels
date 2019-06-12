/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const signStatusMap = {
  '0': {
    show: 'Sign Pending',
    icon: '/static/images/icon-clock.svg',
    name: 'pending'
  },
  '1': {
    show: 'Signed Agreement',
    icon: '/static/images/icon-check.svg',
    name: 'success'
  }
};

export default signStatusMap;
