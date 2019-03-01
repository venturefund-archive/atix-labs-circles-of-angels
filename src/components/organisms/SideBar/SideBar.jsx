import React from "react";
import { Layout, Menu, Icon } from "antd";
import 'antd/dist/antd.css';
import './_style.scss';

const { Sider } = Layout;

const SideBar = () => (
    <Sider
      width="80"
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">
        <img src="/images/circle-isologo.svg" alt="Circles of Angels" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item key="1">
          <img src="/images/menu-home.svg" alt="Home" />
        </Menu.Item>
        <Menu.Item key="2">
          <img src="/images/menu-settings.svg" alt="Settings" />
        </Menu.Item>
      </Menu>
    </Sider>
);

export default SideBar;
