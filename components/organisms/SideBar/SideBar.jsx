import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './_style.scss';
import Routing from '../../utils/Routes';

const { Sider } = Layout;

const goToExploreProjects = () => {
  Routing.toExploreProjects();
};

const SideBar = () => (
  <Sider
    width="70"
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
      <img src="./static/images/circle-isologo.svg" alt="Circles of Angels" />
    </div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
      <Menu.Item key="1" onClick={goToExploreProjects}>
        <Icon type="appstore" />
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="sliders" />
      </Menu.Item>
    </Menu>
  </Sider>
);

export default SideBar;
