import React from 'react';
import UserAvatar from '../../molecules/UserAvatar/UserAvatar.jsx';
import { UserProvider, UserConsumer } from '../../utils/UserContext';

import './_style.scss';

const Header = () => (
  <UserProvider>
    <div className="HeaderContainer">
      <div className="RightSide">
        <UserConsumer>
          {({ user }) => (
            <UserAvatar userName={user.name} userRole="Impact Funder" />
          )}
        </UserConsumer>
      </div>
    </div>
  </UserProvider>
);

export default Header;
