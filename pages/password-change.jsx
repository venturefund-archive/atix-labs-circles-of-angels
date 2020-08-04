/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import { Row, Col } from 'antd';
import './_login.scss';
import DynamicFormPassword from '../components/organisms/FormLogin/FormPassword';
import SecurityKey from '../components/molecules/SecurityKeySection/SecurityKeySection';
import { updatePassword } from '../api/userApi';

function PasswordChange() {
  const fetchWallet = async () => {
    return true;
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const updatePassword = async password => {
    const { token } = this.props;
    const response = await updatePassword(token, password);
    if (response.error) {
      const { error } = response;
      const title = error.response ? 'Error!' : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    } else {
      showModalSuccess('Success!', 'Your password was successfully changed!');
    }
    return response;
  };

  return (
    <div className="Login">
      <div className="LogoSide">
        <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
      </div>
      <div className="FormSide">
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
              <p className="copy">Copy security Key</p>
            </Col>
          </Row>
        </div>
        <h2>CHANGE YOUR PASSWORD</h2>
        <DynamicFormPassword onSubmit={updatePassword} />
      </div>
    </div>
  );
}

export default PasswordChange;
