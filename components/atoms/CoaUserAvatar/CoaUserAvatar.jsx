import React from 'react';
import { Avatar } from 'antd';
import { stringToHexColor } from '../../../helpers/stringToHexColor';
import './_style.scss'

export const CoaUserAvatar = ({ firstName , lastName, size }) => {
  const customAvatarName = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  const fullName = firstName || lastName
    ? `${firstName} ${lastName}`
    : 'unknown';
  const avatarColor = stringToHexColor(fullName);
  return (
    <Avatar
      style={{ '--avatarColor': avatarColor }}
      className="coaUserAvatar"
      size={size}
    >
      {customAvatarName}
    </Avatar>
  );
}

CoaUserAvatar.defaultProps = {
  firstName: '',
  lastName: '',
  size: 40,
};
