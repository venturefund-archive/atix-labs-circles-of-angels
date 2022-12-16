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

const roles = {
  admin: 'Administrator',
}

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

  return (
    <div className='navbar__right__profile'
      onClick={toggleAvatarDropdown}
      onKeyPress={toggleAvatarDropdown}
      role='button'
    >
      <div className='navbar__user__avatar'>
        <img src="/static/images/avatar.svg" alt="user" />
      </div>
      <div className='navbar__user' >
        <div className='user__details'>
          <h2>{user.firstName} {user.lastName}</h2>
          <span>{roles[user.role]}</span>
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
