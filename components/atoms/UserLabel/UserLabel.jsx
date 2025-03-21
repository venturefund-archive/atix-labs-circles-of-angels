/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const UserLabel = ({ userName, userRole }) => (
  <div className="UserLabel">
    <h4>{userName}</h4>
    <p>{userRole}</p>
  </div>
);

export default UserLabel;

UserLabel.propTypes = {
  userName: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired
};
