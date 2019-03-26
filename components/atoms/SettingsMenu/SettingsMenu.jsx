import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { withUser } from '../../utils/UserContext';
import Link from 'next/link';

import './_style.scss';

const SettingsMenu = ({ text, removeUser }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link href="/#">
          <a>My Account</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href="/create-project-step1">
          <a>Create Project</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="/login">
          <a onClickCapture={removeUser}>Log out</a>
        </Link>
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
