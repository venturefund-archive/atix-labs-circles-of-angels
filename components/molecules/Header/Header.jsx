import React from 'react';
import UserAvatar from '../../molecules/UserAvatar/UserAvatar.jsx';
import { UserConsumer } from '../../utils/UserContext';

import './_style.scss';

const Header = () => (
  <div className="HeaderContainer">
    <div className="RightSide">
      <UserConsumer>
        {({ user }) => (
          <UserAvatar userName={user.name} userRole="Impact Funder" />
        )}
      </UserConsumer>
    </div>
  </div>
);

export default Header;
