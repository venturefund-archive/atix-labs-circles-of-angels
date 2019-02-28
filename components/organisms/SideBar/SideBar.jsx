import React from "react";
import { Layout, Menu, Icon } from "antd";
import 'antd/dist/antd.css';
import './_style.scss';
import Link from 'next/link';
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary';

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
        <img src="./static/images/circle-isologo.svg" alt="Circles of Angels" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item key="1">
          <img src="./static/images/menu-home.svg" alt="Home" />
        </Menu.Item>
        <Menu.Item key="2">
          <img src="./static/images/menu-settings.svg" alt="Settings" />
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/transferSubmit">
            <ButtonPrimary text="Submit"></ButtonPrimary>
          </Link>          
        </Menu.Item>
        <Menu.Item key="4">
          <Link href="/transferStatus">
            <ButtonPrimary text="Status"></ButtonPrimary>
          </Link>          
        </Menu.Item>
      </Menu>
    </Sider>
);

export default SideBar;
