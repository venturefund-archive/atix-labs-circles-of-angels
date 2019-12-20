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
import './_style.scss';

const { Sider } = Layout;

const backOfficeMenuItems = [
  {
    route: '/my-projects',
    key: 'my-projects',
    content: (
      <img src="./static/images/dashboard-icon-navbar.svg" alt="myprojects" />
    )
  },
  {
    route: '/fund-administration',
    key: 'fund-administration',
    content: <Icon type="fund" />
  },
  {
    route: '/back-office-users',
    key: 'back-office-users',
    content: <Icon type="team" />
  },
  {
    route: '/back-office-milestones',
    key: 'back-office-milestones',
    content: <Icon type="file-protect" />
  }
];

const SideBar = ({ isBackofficeAdmin }) => {
  const history = useHistory();

  const goToRoute = route => history.push(route);

  return (
    <Sider width="60" breakpoint="md" collapsedWidth="0">
      <div className="logo">
        <img src="./static/images/circle-isologo.svg" alt="Circles of Angels" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['-1']}>
        <Menu.Item
          key="1"
          onClick={
            isBackofficeAdmin
              ? () => goToRoute('/back-office-projects')
              : () => goToRoute('/explore-projects')
          }
        >
          <img
            src="./static/images/projects-icon-navbar.svg"
            alt="myprojects"
          />
        </Menu.Item>
        {!isBackofficeAdmin &&
          backOfficeMenuItems.map(({ key, route, content }) => (
            <Menu.Item key={key} onClick={() => goToRoute(route)}>
              {content}
            </Menu.Item>
          ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;

SideBar.defaultProps = {
  isBackofficeAdmin: false
};

SideBar.propTypes = {
  isBackofficeAdmin: PropTypes.bool
};
