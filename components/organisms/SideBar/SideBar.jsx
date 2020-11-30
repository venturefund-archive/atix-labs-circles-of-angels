/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import { Layout, Menu } from 'antd';
import menuItems from './MenuItems';
import './_style.scss';

const { Sider } = Layout;

const SideBar = ({ role, hasDaos }) => {
  const history = useHistory();
  const location = useLocation();

  const goToRoute = route => history.push(route);

  const getMenuItems = userRole => {
    const daosKey = 'dao-list';
    let items = menuItems.filter(({ allowedRoles }) =>
      allowedRoles.includes(userRole)
    );
    if (!hasDaos) {
      items = items.filter(({ key }) => key !== daosKey);
    }
    return items;
  };

  return (
    <Sider width="60" breakpoint="md" collapsedWidth="0">
      <div className="logo">
        <img src="./static/images/isologo.svg" alt="Circles of Angels" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname.replace('/', '')]}
      >
        {getMenuItems(role).map(({ key, route, content }) => (
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
  role: PropTypes.string.isRequired,
  hasDaos: PropTypes.bool.isRequired
};
