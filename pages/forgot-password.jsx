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
import customConfig from 'custom-config';
import { Spin } from 'antd';
import queryString from 'query-string';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import './_login.scss';
import DynamicFormForgotPassword from '../components/organisms/FormLogin/FormForgotPassword';
import { changeRecoverPassword, getMnemonicFromToken } from '../api/userApi';
import {
  encryptWallet,
  generateWalletFromMnemonic,
  createNewWallet
} from '../helpers/blockchain/wallet';

function ForgotPassword() {
  const history = useHistory();
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const query = window.location && queryString.parse(window.location.search);
  const { token } = query || {};

  const fetchMnemonic = async () => {
    const { data, errors } = await getMnemonicFromToken(token);
    if (errors) throw new Error(errors);
    const mnemonic = data;
    return mnemonic;
  };

  const goToDashboard = () => history.push('/');

  const updatePassword = async newPassword => {
    let data;
    try {
      setLoading(true);
      const mnemonic = await fetchMnemonic();
      if (!mnemonic) {
        const { mnemonic: newMnemonic, address, encryptedWallet } = await createNewWallet(
          newPassword
        );
        data = {
          token,
          password: newPassword,
          address,
          encryptedWallet,
          mnemonic: newMnemonic
        };
      } else {
        const decrypted = generateWalletFromMnemonic(mnemonic);
        const encrypted = await encryptWallet(decrypted, newPassword);
        const { address } = decrypted;
        data = {
          token,
          password: newPassword,
          address,
          encryptedWallet: encrypted,
          mnemonic
        };
      }
      await changeRecoverPassword(data);
      showModalSuccess('Success!', 'Your password was successfully changed!');
      setSuccessfulUpdate(true);
      goToDashboard();
    } catch (error) {
      const title = 'Error!';
      const content = error.response ? error.response.data.error : error.message;
      showModalError(title, content);
    }
    setLoading(false);
  };

  const renderForm = () => (
    <div>
      {!successfulUpdate && (
        <div>
          <Spin spinning={loading}>
            <h1>{customConfig.ORGANIZATION_NAME}</h1>
            <h2>CHANGE YOUR PASSWORD</h2>
            <DynamicFormForgotPassword onSubmit={updatePassword} />
          </Spin>
        </div>
      )}
    </div>
  );

  return (
    <div className="Login">
      <div className="LogoSide">
        <img
          src={customConfig.LARGE_LOGO_PATH_PNG}
          alt={`${customConfig.ORGANIZATION_NAME} side logo`}
        />
      </div>
      <div className="FormSide">{renderForm()}</div>
    </div>
  );
}

export default ForgotPassword;
