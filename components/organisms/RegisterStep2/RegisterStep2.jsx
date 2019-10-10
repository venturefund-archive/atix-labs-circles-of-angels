/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import './_style.scss';

const OptionsUsers = ({ title, usertype }) => (
  <Col span={8}>
    <div className="OptionsUsers">
      <img src="./static/images/icon-users-small.svg" alt="platformusers" />
      <h1>{title}</h1>
      <p>{usertype}</p>
    </div>
  </Col>
);
const RegisterStep2 = () => (
  <div>
    <div className="InfoStep">
      <img src="./static/images/icon-users.svg" alt="platformusers" />
      <h2>Platform User</h2>
      <h4>
        Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit amet..
      </h4>
    </div>
    <div className="StepPersonalInformation">
      <TitlePage textTitle="What do you want to do?" />

      <Row className="FormRegister" gutter={26}>
        <OptionsUsers title="Create a Project" usertype="Social Entrepreneur" />
        <OptionsUsers title="Fund a Project" usertype="Impact Funder" />
        <OptionsUsers title="Monitor a Project" usertype="Oracle" />
      </Row>
    </div>
  </div>
);

export default RegisterStep2;
