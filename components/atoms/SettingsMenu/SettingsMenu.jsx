import React from "react";
import { Menu, Dropdown, Icon } from 'antd';

import "./_style.scss";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/#">My Account</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/#">Log out</a>
    </Menu.Item>
  </Menu>
);

const SettingsMenu = ({ text }) => (
  <div className="SettingsMenu">
    <Dropdown overlay={menu} trigger={["click"]}>
      <a className="ant-dropdown-link" href="/#">
        <Icon type="down" />
      </a>
    </Dropdown>
  </div>
);

export default SettingsMenu;
