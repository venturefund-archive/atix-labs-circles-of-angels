import React from 'react';
import UserAvatar from '../../molecules/UserAvatar/UserAvatar.jsx';

import './_style.scss';

const Header = () => (
  <div className="HeaderContainer">
    <div className="RightSide">
      <UserAvatar />
    </div>
  </div>
);

export default Header;
