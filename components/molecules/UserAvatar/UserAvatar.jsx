/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Avatar } from 'antd';
import UserLabel from '../../atoms/UserLabel/UserLabel.jsx';
import SettingsMenu from '../../atoms/SettingsMenu/SettingsMenu.jsx';

import './_style.scss';

const getInitials = fullName => {
  if (!fullName) return;
  var initials = fullName.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};

const UserAvatar = ({ userName, userRole }) => (
  <div className="UserAvatar">
    <div className="UserData">
      <Avatar style={{ color: '#0055FF', backgroundColor: '#B3CCFF' }}>
        {getInitials(userName)}
      </Avatar>
      <UserLabel userName={userName} userRole={userRole} />
    </div>
    <SettingsMenu />
  </div>
);

export default UserAvatar;
