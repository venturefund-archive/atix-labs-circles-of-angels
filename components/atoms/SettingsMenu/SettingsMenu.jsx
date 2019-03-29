import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Routing from '../../utils/Routes';
import { withUser } from '../../utils/UserContext';

import './_style.scss';

const SettingsMenu = ({ text, removeUser }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">My Account</Menu.Item>
      <Menu.Item key="1" onClick={Routing.toCreateProject}>
        Create Project
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          removeUser();
          Routing.toLogin();
        }}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="SettingsMenu">
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="/#">
          <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
};

export default withUser(SettingsMenu);
