/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Spin } from 'antd';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import './_login.scss';
import DynamicFormPassword from '../components/organisms/FormLogin/FormPassword';
import { changePassword, getWallet } from '../api/userApi';
import { encryptWallet, decryptJsonWallet } from '../helpers/blockchain/wallet';

function PasswordChange() {
  const history = useHistory();
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWallet = async () => {
    const response = await getWallet();
    const encryptedWallet = JSON.stringify(response.data);
    return encryptedWallet;
  };

  const goToDashboard = () => history.push('/');

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      const wallet = await fetchWallet();
      const decrypted = await decryptJsonWallet(wallet, currentPassword);
      const encrypted = await encryptWallet(decrypted, newPassword);
      const data = {
        currentPassword,
        newPassword,
        encryptedWallet: encrypted
      };
      await changePassword(data);
      showModalSuccess('Success!', 'Your password was successfully changed!');
      setSuccessfulUpdate(true);
      goToDashboard();
    } catch (error) {
      const title = 'Error!';
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
    setLoading(false);
  };

  const renderForm = () => (
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

  return (
    <div className="Login">
      <div className="LogoSide">
        <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
      </div>
      <div className="FormSide">{renderForm()}</div>
    </div>
  );
}

export default PasswordChange;
