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
import { Avatar } from 'antd';
import { stringToHexColor } from '../../../helpers/stringToHexColor';


export default function NavbarProfile({ user, removeUser }) {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const { push, location } = useHistory()

  function toggleAvatarDropdown() {
    setIsAvatarOpen(open => !open)
  }

  const logout = () => {
    removeUser();
    push(`/${location.pathname.split('/')[1]}`)
  }

  const getAvatarRole = () => {
    const { isAdmin, role } = user;
    if(isAdmin) return 'Administrator';
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  const { firstName, lastName } = user;
  const customAvatarName = firstName.charAt(0).toUpperCase()
    + lastName.charAt(0).toUpperCase();
  const avatarColor = stringToHexColor(`${firstName} ${lastName}`);

  return (
    <div className='navbar__right__profile'
      onClick={toggleAvatarDropdown}
      onKeyPress={toggleAvatarDropdown}
      role='button'
    >
      <div className='navbar__user__avatar'>
        <Avatar
        style={{ '--avatarColor': avatarColor }}
        className="m-coaProjectMembersCard__avatar"
        size="large"
        >
          {customAvatarName}
        </Avatar>
      </div>
      <div className='navbar__user' >
        <div className='user__details'>
          <h2>{user.firstName} {user.lastName}</h2>
          <span>{getAvatarRole()}</span>
        </div>
        <div className='dropdown'>
          <img
            src="/static/images/arrow-down.svg"
            alt="arrow-down"
          />
        </div>
        {
          isAvatarOpen && (
            <div className='navbar__dropdown__mask'></div>
          )
        }
        <div
          className={`navbar__dropdown ${isAvatarOpen ? '--visible' : '--hidden'}`}
          onClick={logout}
          role='button'
        >
          <LogoutOutlined className='navbar__dropdown__icon' />
          <p className='navbar__dropdown__logout'>Log Out</p>
        </div>
      </div>
    </div>
  )
}

NavbarProfile.defaultProps = {
  user: null,
  removeUser: () => undefined
}

NavbarProfile.propTypes = {
  user: PropTypes.shape,
  removeUser: PropTypes.func
}
