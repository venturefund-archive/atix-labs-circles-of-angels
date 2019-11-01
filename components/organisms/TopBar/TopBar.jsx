/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col, Divider } from 'antd';
import './_style.scss';
import Routing from '../../utils/Routes';
import { withUser } from '../../utils/UserContext';
import ModalLogin from '../ModalLogin/ModalLogin';

const TopBar = ({ textBlack, textLink }) => (
  <Row className="TopBar" type="flex" justify="space-between" align="middle">
    <Col className="gutter-row" xs={10} sm={4} lg={4}>
      <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
    </Col>
    <Col
      className="gutter-row"
      xs={{ span: 11, offset: 1 }}
      sm={{ span: 7, offset: 10 }}
      lg={{ span: 3, offset: 14 }}
    >
      {textBlack} <Divider type="vertical" /> <ModalLogin />
    </Col>
  </Row>
);
export default TopBar;
