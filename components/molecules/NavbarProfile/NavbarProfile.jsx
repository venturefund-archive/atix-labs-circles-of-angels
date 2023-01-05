/* eslint-disable
 jsx-a11y/anchor-is-valid,
 jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-static-element-interactions,
 jsx-a11y/interactive-supports-focus,
*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaUserAvatar } from '../../atoms/CoaUserAvatar/CoaUserAvatar';

export default function NavbarProfile({ user, removeUser, projectId, role }) {
  const { texts } = React.useContext(DictionaryContext);

  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const { push, location } = useHistory();

  function toggleAvatarDropdown() {
    setIsAvatarOpen(open => !open);
  }

  const logout = () => {
    removeUser();
    push(`/${location.pathname.split('/')[1]}`);
  };

  const { firstName, lastName } = user;

  return (
    <div
      className="navbar__right__profile"
      onClick={toggleAvatarDropdown}
      onKeyPress={toggleAvatarDropdown}
      role="button"
    >
      <div className="navbar__user__avatar">
        <CoaUserAvatar firstName={firstName} lastName={lastName} />
      </div>
      <div className="navbar__user">
        <div className="user__details">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <span>{role}</span>
        </div>
        <div className="dropdown">
          <img src="/static/images/arrow-down.svg" alt="arrow-down" />
        </div>
        {isAvatarOpen && <div className="navbar__dropdown__mask"></div>}
        <div
          className={`navbar__dropdown ${isAvatarOpen ? '--visible' : '--hidden'}`}
          onClick={logout}
          role="button"
        >
          <LogoutOutlined className="navbar__dropdown__icon" />
          <p className="navbar__dropdown__logout">Log Out</p>
        </div>
      </div>
    </div>
  );
}

NavbarProfile.defaultProps = {
  user: null,
  projectId: -1,
  removeUser: () => undefined
};

NavbarProfile.propTypes = {
  projectId: PropTypes.number,
  user: PropTypes.objectOf(PropTypes.any),
  removeUser: PropTypes.func
};
