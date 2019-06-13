/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import { withUser } from '../../utils/UserContext';

import './_style.scss';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="HeaderContainer">
        <div className="RightSide">
          {user && user.role ? (
            <UserAvatar userName={user.username} userRole={user.role.name} />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default withUser(Header);
