/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col } from 'antd';
import './_style4.scss';

export default function RegisterStep4(props) {
  const { fields } = props;

  return (
    <div className="RegisterStep4">
      <div className="InfoStep">
        <img src="./static/images/icon-personal.svg" alt="Circles of Angels" />
        <h2>Enterprise Information</h2>
        <h4>
          Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
          amet..
        </h4>
      </div>
      <div className="StepPersonalInformation">
        <Row className="FormRegister" gutter={26} type="flex" justify="center">
          <Col className="gutter-row BlockCongrats" span={20}>
            <h1>Congratulations</h1>
            <h2> Hello {fields.role.value}!</h2>
            <p>
              Continue discovering the Circles of Angels platform while
              administration confirm your account
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}
