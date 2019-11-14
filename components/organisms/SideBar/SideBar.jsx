/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Layout, Menu, Icon } from 'antd';
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

const goToBackOfficeUsers = () => {
  Routing.toBackOfficeUsers();
};

const goToMyProjects = () => {
  Routing.toMyProjects();
};

const SideBar = ({ isBackofficeAdmin }) => (
  <Sider
    width="60"
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
        <img src="./static/images/projects-icon-navbar.svg" alt="myprojects" />
      </Menu.Item>
      {!isBackofficeAdmin && (
        <Menu.Item key="2" onClick={goToMyProjects}>
          <img
            src="./static/images/dashboard-icon-navbar.svg"
            alt="myprojects"
          />
        </Menu.Item>
      )}
      {isBackofficeAdmin && (
        <Menu.Item key="3" onClick={goToFundsAdministration}>
          <Icon type="fund" />
        </Menu.Item>
      )}
      {isBackofficeAdmin && (
        <Menu.Item key="4" onClick={goToBackOfficeUsers}>
          <Icon type="team" />
        </Menu.Item>
      )}
      {isBackofficeAdmin ? (
        <Menu.Item key="5" onClick={goToBackofficeMilestones}>
          <Icon type="file-protect" />
        </Menu.Item>
      ) : (
        ''
      )}
    </Menu>
  </Sider>
);

export default withUser(SideBar);
