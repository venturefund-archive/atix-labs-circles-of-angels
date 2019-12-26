/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import Roles from '../../../constants/RolesMap';
import './_style.scss';

const { Sider } = Layout;

const userMenuItems = [
  {
    route: '/explore-projects',
    key: 'explore-projects',
    content: (
      <img src="./static/images/projects-icon-navbar.svg" alt="projects" />
    )
  },
  {
    route: '/my-projects',
    key: 'my-projects',
    content: (
      <img src="./static/images/dashboard-icon-navbar.svg" alt="myprojects" />
    )
  }
];

const adminMenuItems = [
  {
    route: '/back-office-projects',
    key: 'back-office-projects',
    content: (
      <img src="./static/images/projects-icon-navbar.svg" alt="projects" />
    )
  },
  {
    route: '/fund-administration',
    key: 'fund-administration',
    content: <Icon className="icon" type="fund" />
  },
  {
    route: '/back-office-users',
    key: 'back-office-users',
    content: <Icon className="icon" type="team" />
  },
  {
    route: '/back-office-milestones',
    key: 'back-office-milestones',
    content: <Icon className="icon" type="file-protect" />
  }
];

const SideBar = ({ role }) => {
  const history = useHistory();
  const isBackofficeAdmin = role === Roles.BackofficeAdmin;

  const goToRoute = route => history.push(route);

  const getMenuItems = isAdmin => (isAdmin ? adminMenuItems : userMenuItems);

  return (
    <Sider width="60" breakpoint="md" collapsedWidth="0">
      <div className="logo">
        <img src="./static/images/circle-isologo.svg" alt="Circles of Angels" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['-1']}>
        {getMenuItems(isBackofficeAdmin).map(({ key, route, content }) => (
          <Menu.Item key={key} onClick={() => goToRoute(route)}>
            {content}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;

SideBar.propTypes = {
  role: PropTypes.string.isRequired
};
