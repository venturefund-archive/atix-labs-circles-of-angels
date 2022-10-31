/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Row, Col } from 'antd';
import '../_style.scss';
import './_landing.scss';
import customConfig from 'custom-config';
import TopBar from '../../components/organisms/TopBar/TopBar';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import ModalLogin from '../../components/organisms/ModalLogin/ModalLogin';

function Landing() {
  const [visibility, setVisibility] = useState(false);

  const modalLogin = (
    <div className="WrapperModalLogin">
      <CustomButton
        data-testid="loginButton"
        buttonText="Log In"
        theme="Secondary"
        onClick={() => setVisibility(true)}
      />
      <ModalLogin
        data-testid="modal"
        setVisibility={setVisibility}
        visibility={visibility}
      />
    </div>
  );

  return (
    <Row
      className="Landing"
      style={{
        background: `url(${customConfig.BACKGROUND_PATH}) top left / cover no-repeat`
      }}
    >
      <TopBar modalLogin={modalLogin} />
    </Row>
  );
}

export default Landing;
