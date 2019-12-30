import React from 'react';
import { Icon } from 'antd';

const menuItems = {
  admin: [
    {
      route: '/back-office-users',
      key: 'back-office-users',
      content: <Icon className="icon" type="team" />
    }
  ],
  entrepreneur: [
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
  ],
  supporter: [
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
  ],
  curator: [
    {
      route: '/back-office-projects',
      key: 'back-office-projects',
      content: (
        <img src="./static/images/projects-icon-navbar.svg" alt="projects" />
      )
    },
    {
      route: '/back-office-milestones',
      key: 'back-office-milestones',
      content: <Icon className="icon" type="file-protect" />
    }
  ],
  bankoperator: [
    {
      route: '/fund-administration',
      key: 'fund-administration',
      content: <Icon className="icon" type="fund" />
    }
  ]
};

export default menuItems;
