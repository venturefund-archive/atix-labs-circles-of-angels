/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import { useUserContext } from '../../utils/UserContext';

const Header = () => {
  const { getLoggedUser } = useUserContext();
  const user = getLoggedUser();
  return (
    <div className="HeaderContainer">
      <div className="RightSide">{user && user.role ? <UserAvatar user={user} /> : ''}</div>
    </div>
  );
};

export default Header;
