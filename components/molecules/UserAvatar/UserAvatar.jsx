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
      <Avatar style={{ color: '#0083E3', backgroundColor: '#95d2ff' }}>
        {getInitials(userName)}
      </Avatar>
      <UserLabel userName={userName} userRole={userRole} />
    </div>
    <SettingsMenu />
  </div>
);

export default UserAvatar;
