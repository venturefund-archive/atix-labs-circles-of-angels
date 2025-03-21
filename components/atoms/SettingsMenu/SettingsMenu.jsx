/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Menu, Dropdown, Icon, Button } from 'antd';
import { UserContext } from '../../utils/UserContext';

import './_style.scss';

const SettingsMenu = () => {
  const { removeUser } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    removeUser();
    history.push('/');
  };

  const changePassword = () => {
    history.push('/password-change');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={changePassword}>
        Change Password
      </Menu.Item>
      <Menu.Item key="2" onClick={logout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="SettingsMenu">
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="link" size="small">
          <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
  );
};

export default SettingsMenu;
