/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import UserLabel from '../../atoms/UserLabel/UserLabel';
import SettingsMenu from '../../atoms/SettingsMenu/SettingsMenu';
import { getInitials } from '../../../helpers/formatter';

const UserAvatar = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div className="UserAvatar">
      <div className="UserData">
        <Avatar style={{ color: '#0055FF', backgroundColor: 'rgba(0, 85, 255, 0.3)', height: '30px', width: '30px' }}>
          {getInitials(fullName)}
        </Avatar>
        <UserLabel userName={fullName} userRole={user.role} />
      </div>
      <SettingsMenu />
    </div>
  );
};

UserAvatar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired
};

export default UserAvatar;
