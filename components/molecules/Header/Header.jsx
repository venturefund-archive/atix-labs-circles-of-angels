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
