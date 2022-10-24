/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop
 * impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import './_style.scss';
import { MenuOutlined } from '@ant-design/icons';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ModalLogin from '../ModalLogin/ModalLogin';

const TopBar = () => {
  const [visibility, setVisibility] = useState(false);
  useLayoutEffect(() => {
    setVisibility(window.location.pathname.includes('/login'));
  }, []);
  const modalLogin = (
    <div className="WrapperModalLogin">
      <CustomButton
        data-testid="adminLoginButton"
        buttonText="Log In"
        theme="Secondary"
        onClick={() => setVisibility(true)}
      />
      <ModalLogin
        data-testid="modal"
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </div>
  );
  return (
    <Row className="TopBar" type="flex" justify="space-between" align="middle">
      <Col className="gutter-row" xs={24} sm={4} lg={4}>
        <MenuOutlined
          className="TopBarIcon"
          style={{ fontSize: '16px', color: '#4C7FF7' }}
        />
        <picture>
          <source
            srcSet="./static/images/isologo.svg"
            media="(max-width: 576px)"
          />
          <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
        </picture>
      </Col>
      {modalLogin}
    </Row>
  );
};
export default TopBar;
