/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col } from 'antd';
import '../_style4.scss';
import SecurityKey from '../../../../molecules/SecurityKeySection/SecurityKeySection';

export default function RegisterStep4(props) {
  const { fields } = props;

  return (
    <div className="RegisterStep4">
      <div className="InfoStep">
        <img
          src="./static/images/icon-users-small.svg"
          alt="Circles of Angels"
        />
        <h1>Congratulations</h1>
        <h2> Hello {fields.role.value}!</h2>
        <p>
          Continue discovering the Circles of Angels platform while
          administration confirm your account
        </p>
      </div>
      <div className="StepPersonalInformation">
        <Row className="FormRegister" gutter={26} type="flex" justify="center">
          <Col className="gutter-row BlockCongrats BlockKeyWords" span={20}>
            <div className="SubtitleSection">
              <img src="./static/images/password-lock.svg" alt="password" />
              <h2>Please keep your security key safe!</h2>
            </div>
            <p>
              This keywords will guarantee your access to your account at any
              time
            </p>
            <SecurityKey />
          </Col>
        </Row>
      </div>
    </div>
  );
}
