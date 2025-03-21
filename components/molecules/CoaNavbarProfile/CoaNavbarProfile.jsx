import React from 'react';
import './coa-navbar-profile.scss';
import { Dropdown, Icon, Menu } from 'antd';
import { CoaUserAvatar } from 'components/atoms/CoaUserAvatar/CoaUserAvatar';
import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const CustomMenu = ({ handleLogout }) => (
  <Menu>
    <Menu.Item key="0" onClick={handleLogout} className="customMenu__item">
      <LogoutOutlined className="customMenu__item__icon" />
      <span className="customMenu__item__text">Log Out</span>
    </Menu.Item>
  </Menu>
);

export const CoaNavbarProfile = ({ user, role, removeUser, isProtectedRoute }) => {
  const { firstName, lastName } = user;
  const { push, location } = useHistory();

  const logout = () => {
    removeUser();
    push(isProtectedRoute ? '/' : `/${location.pathname.split('/')[1]}`);
  };

  return (
    <div className="coaNavbarProfile">
      <CoaUserAvatar firstName={firstName} lastName={lastName} />
      <div className="coaNavbarProfile__user">
        <div className="coaNavbarProfile__user__details">
          <h2 className="coaNavbarProfile__userName">{user.firstName}</h2>
          <span className="coaNavbarProfile__userRole">{role}</span>
        </div>

        <Dropdown overlay={<CustomMenu handleLogout={logout} />} trigger={['click']}>
          <Icon type="down" className="coaNavbarProfile__dropdownIcon" />
        </Dropdown>
      </div>
    </div>
  );
};
