/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Tooltip, Avatar } from 'antd';
import { getInitials } from '../../../helpers/formatter';
import { userAvatarPropTypes } from '../../../helpers/proptypes';

const AvatarUser = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <Tooltip title={fullName}>
      {user.avatarImage ? (
        <Avatar src={user.avatarImage} alt={getInitials(fullName)} />
      ) : (
        <Avatar style={{ color: '#0055FF', backgroundColor: '#e5e6e8' }}>
          {getInitials(fullName)}
        </Avatar>
      )}
    </Tooltip>
  );
};

AvatarUser.propTypes = {
  user: PropTypes.shape(userAvatarPropTypes).isRequired
};

export default AvatarUser;
