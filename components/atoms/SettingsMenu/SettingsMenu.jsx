/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { useHistory } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';
import { withUser } from '../../utils/UserContext';
import Roles from '../../../constants/RolesMap';

import './_style.scss';

const SettingsMenu = ({ text, user }) => {
  const history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item key="0">My Account</Menu.Item>
      {user.role.id === Roles.SocialEntrepreneur ? (
        <Menu.Item key="1" onClick={() => history.push('/create-project')}>
          Create Project
        </Menu.Item>
      ) : (
        ''
      )}
      <Menu.Item key="2" onClick={() => history.push('/landing')}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="SettingsMenu">
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="/#">
          <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
};

export default withUser(SettingsMenu);
