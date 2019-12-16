/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import './_style.scss';
import { Tooltip, Avatar } from 'antd';

const AvatarUser = ({ tooltipText, avatarImage }) => (
  <Tooltip title={tooltipText}>
    <Avatar src={avatarImage} />
  </Tooltip>
);

export default AvatarUser;
