/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Row, Col, Popover, Spin } from 'antd';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import './_login.scss';
import DynamicFormPassword from '../components/organisms/FormLogin/FormPassword';
import SecurityKey from '../components/molecules/SecurityKeySection/SecurityKeySection';
import { changePassword, getWallet } from '../api/userApi';
import { encryptWallet, decryptJsonWallet } from '../helpers/blockchain/wallet';
import CustomButton from '../components/atoms/CustomButton/CustomButton';

function PasswordChange() {
  const history = useHistory();
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mnemonics, setMnemonics] = useState('');

  const fetchWallet = async () => {
    const response = await getWallet();
    const encryptedWallet = JSON.stringify(response.data);
    return encryptedWallet;
  };

  const mnemonicWords = () => {
    return mnemonics.split(' ');
  };

  const copyToClipboard = words => {
    navigator.clipboard.writeText(words);
  };

  const goToDashboard = () => {
    return history.push('/');
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      const wallet = await fetchWallet();
      const decrypted = await decryptJsonWallet(wallet, currentPassword);
      const encrypted = await encryptWallet(decrypted, newPassword);
      const data = { 
        password: newPassword, 
        encryptedWallet: encrypted 
      };
      await changePassword(data);
      setMnemonics(decrypted.mnemonic);
      showModalSuccess('Success!', 'Your password was successfully changed!');
      setSuccessfulUpdate(true);
    } catch (error) {
      const title = 'Error!';
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
    setLoading(false);
  };

  const renderForm = () => {
    return (
      <div>
        {!successfulUpdate && (
          <div>
            <Spin spinning={loading}>
              <h1>CIRCLE OF ANGELS</h1>
              <h2>CHANGE YOUR PASSWORD</h2>
              <DynamicFormPassword onSubmit={updatePassword} />
            </Spin>
          </div>
        )}
      </div>
    );
  };

  const renderPersonalInfo = () => {
    return (
      <div>
        {successfulUpdate && (
          <div className="StepPersonalInformation">
            <Row className="FormRegister" gutter={26} type="flex" justify="center">
              <Col className="gutter-row BlockCongrats BlockKeyWords" span={20}>
                <div className="SubtitleSection">
                  <img src="./static/images/password-lock.svg" alt="password" />
                  <h2>Please save these words somewhere safe!</h2>
                </div>
                <p>
                  These keywords will guarantee access to your account at any
                  time
                </p>
                <SecurityKey words={mnemonicWords()} />
                <Popover content="Copied" trigger="click">
                  <CustomButton
                    className="securityKey"
                    theme="Alternative"
                    buttonText="Copy"
                    onClick={() => copyToClipboard(mnemonics)}
                  />
                </Popover>
                <div className="buttonSection">
                  <CustomButton
                    theme="Primary"
                    buttonText="Finish!"
                    onClick={goToDashboard}
                  />
                </div>
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
      <div className="FormSide" >
        {renderForm()}
        {renderPersonalInfo()}
      </div>
    </div>
  );
}

export default PasswordChange;
