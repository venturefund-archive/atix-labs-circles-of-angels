import React from 'react';
import { Icon } from 'antd';
import Roles from '../../../constants/RolesMap';

const menuItems = [
  {
    route: '/back-office-users',
    key: 'back-office-users',
    content: <Icon className="icon" type="team" />,
    allowedRoles: [Roles.COA_ADMIN]
  },
  {
    route: '/explore-projects',
    key: 'explore-projects',
    content: (
      <img src="./static/images/projects-icon-navbar.svg" alt="projects" />
    ),
    allowedRoles: [Roles.ENTREPRENEUR, Roles.PROJECT_SUPPORTER]
  },
  {
    route: '/my-projects',
    key: 'my-projects',
    content: (
      <img src="./static/images/dashboard-icon-navbar.svg" alt="myprojects" />
    ),
    allowedRoles: [Roles.ENTREPRENEUR, Roles.PROJECT_SUPPORTER]
  },
  {
    route: '/dao-list',
    key: 'dao-list',
    content: (
      <img src="./static/images/dashboard-icon-navbar.svg" alt="daolist" />
    ),
    allowedRoles: [Roles.ENTREPRENEUR, Roles.PROJECT_SUPPORTER, Roles.PROJECT_CURATOR]
  },
  {
    route: '/back-office-projects',
    key: 'back-office-projects',
    content: (
      <img src="./static/images/projects-icon-navbar.svg" alt="projects" />
    ),
    allowedRoles: [Roles.PROJECT_CURATOR]
  },
  {
    route: '/fund-administration',
    key: 'fund-administration',
    content: <Icon className="icon" type="fund" />,
    allowedRoles: [Roles.BANK_OPERATOR]
  },
  {
    route: '/back-office-milestones',
    key: 'back-office-milestones',
    content: <Icon className="icon" type="file-protect" />,
    allowedRoles: [Roles.BANK_OPERATOR]
  }
];

export default menuItems;
