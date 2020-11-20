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
import CardMember from '../CardMember/CardMember';

const DaoMembers = ({ users }) => (
  <div className="BoxContainer">
    {users.map(member => (
      <CardMember member={member} />
    ))}
  </div>
);

export default DaoMembers;

DaoMembers.propTypes = {
  users: PropTypes.element.isRequired
};
