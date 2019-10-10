/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col, Select } from 'antd';
import './_style.scss';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

const RegisterStep4 = () => (
  <div className="RegisterStep4">
    <div className="InfoStep">
      <img src="./static/images/icon-personal.svg" alt="Circles of Angels" />
      <h2>Enterprise Information</h2>
      <h4>
        Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit amet..
      </h4>
    </div>
    <div className="StepPersonalInformation">
      <Row className="FormRegister" gutter={26} type="flex" justify="center">
        <Col className="gutter-row BlockCongrats" span={12}>
          <h1>Congratulations</h1>
          <h2> Hello Social Entrepreneur !</h2>
          <p>
            Continue discovering the Circles of Angels platform while
            administration confirm your account
          </p>
        </Col>
      </Row>
    </div>
  </div>
);

export default RegisterStep4;
