import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Link from 'next/link';

import './_style.scss';

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
      <Link href="/#">
        <a>Log out</a>
      </Link>
    </Menu.Item>
  </Menu>
);

const SettingsMenu = ({ text }) => (
  <div className="SettingsMenu">
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" href="/#">
        <Icon type="down" />
      </a>
    </Dropdown>
  </div>
);

export default SettingsMenu;
