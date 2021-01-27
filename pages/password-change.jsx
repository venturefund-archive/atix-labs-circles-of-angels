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
import {
  encryptWallet,
  decryptJsonWallet,
  createNewWallet
} from '../helpers/blockchain/wallet';

function PasswordChange() {
  const history = useHistory();
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWallet = async () => {
    const response = await getWallet();
    if (response.errors) {
      return;
    }
    const encryptedWallet = JSON.stringify(response.data);
    return encryptedWallet;
  };

  const goToDashboard = () => history.push('/');

  const updatePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    let data;
    const wallet = await fetchWallet();
    if (!wallet) {
      const {
        mnemonic: newMnemonic,
        address,
        encryptedWallet
      } = await createNewWallet(newPassword);
      data = {
        currentPassword,
        newPassword,
        address,
        encryptedWallet,
        mnemonic: newMnemonic
      };
    } else {
      const decrypted = await decryptJsonWallet(wallet, currentPassword);
      const encrypted = await encryptWallet(decrypted, newPassword);
      data = {
        currentPassword,
        newPassword,
        encryptedWallet: encrypted
      };
    }
    const response = await changePassword(data);
    if (response.errors) {
      const title = 'Error!';
      const content = response.errors;
      showModalError(title, content);
      setLoading(false);
      return;
    }
    showModalSuccess('Success!', 'Your password was successfully changed!');
    setSuccessfulUpdate(true);
    goToDashboard();
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
