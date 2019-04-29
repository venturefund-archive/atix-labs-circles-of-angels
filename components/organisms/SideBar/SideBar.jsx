import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './_style.scss';
import Routing from '../../utils/Routes';
import { withUser } from '../../utils/UserContext';

const { Sider } = Layout;

const goToExploreProjects = () => {
  Routing.toExploreProjects();
};

const goToFundsAdministration = () => {
  Routing.toFundAdministration();
};

const goToBackofficeMilestones = () => {
  Routing.toBackofficeMilestones();
};

const goToBackOfficeProjects = () => {
  Routing.toBackOffice();
};

const SideBar = ({ isBackofficeAdmin }) => (
  <Sider
    width="50"
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
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['-1']}>
      <Menu.Item
        key="1"
        onClick={
          isBackofficeAdmin ? goToBackOfficeProjects : goToExploreProjects
        }
      >
        <Icon type="appstore" />
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="sliders" />
      </Menu.Item>
      {isBackofficeAdmin ? (
        <Menu.Item key="3" onClick={goToFundsAdministration}>
          <Icon type="fund" />
        </Menu.Item>
      ) : (
        ''
      )}
      {isBackofficeAdmin ? (
        <Menu.Item key="4" onClick={goToBackofficeMilestones}>
          <Icon type="file-protect" />
        </Menu.Item>
      ) : (
        ''
      )}
    </Menu>
  </Sider>
);

export default withUser(SideBar);
