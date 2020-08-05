/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import './_login.scss';
import DynamicFormPassword from '../components/organisms/FormLogin/FormPassword';
import SecurityKey from '../components/molecules/SecurityKeySection/SecurityKeySection';
import { changePassword, getUser } from '../api/userApi';
import { useUserContext } from '../components/utils/UserContext';
import { encryptWallet, decryptJsonWallet } from '../helpers/blockchain/wallet';

function PasswordChange() {
  const { getLoggedUser } = useUserContext();
  const loggedUser = getLoggedUser();
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);

  const fetchWallet = async () => {
    const response = await getUser(loggedUser.id);
    const { encryptedWallet } = response.data;
    return encryptedWallet;
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const wallet = await fetchWallet();
      console.log(currentPassword, newPassword);
      const decrypted = await decryptJsonWallet(wallet, currentPassword);
      const encrypted = await encryptWallet(decrypted, newPassword);
      const data = { 
        password: newPassword, 
        encryptedWallet: encrypted 
      };
      const response = await changePassword(data);
      showModalSuccess('Success!', 'Your password was successfully changed!');
      setSuccessfulUpdate(true);
    } catch (error) {
      const title = 'Error!';
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
  };

  const renderForm = () => {
    return (
      <div className="FormSide">
        {!successfulUpdate && (
          <div>
            <h1>CIRCLE OF ANGELS</h1>
            <h2>CHANGE YOUR PASSWORD</h2>
            <DynamicFormPassword onSubmit={updatePassword} />
          </div>
        )}
        {successfulUpdate && (
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
        )}
      </div>
    );
  };

  return (
    <div className="Login">
      <div className="LogoSide">
        <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
      </div>
      {renderForm()}
    </div>
  );
}

export default PasswordChange;
