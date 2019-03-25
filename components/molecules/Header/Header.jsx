import React from 'react';
import UserAvatar from '../../molecules/UserAvatar/UserAvatar.jsx';
import { withUser } from '../../utils/UserContext';

import './_style.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="HeaderContainer">
        <div className="RightSide">
          <UserAvatar
            userName={this.props.user.username}
            userRole="Impact Funder"
          />
        </div>
      </div>
    );
  }
}

export default withUser(Header);
