/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Spin } from 'antd';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import queryString from 'query-string';
import './_login.scss';
import DynamicFormForgotPassword from '../components/organisms/FormLogin/FormForgotPassword';
import { changeRecoverPassword, getMnemonicFromToken } from '../api/userApi';
import { encryptWallet, decryptMnemonicWallet } from '../helpers/blockchain/wallet';

function ForgotPassword() {
  const history = useHistory();
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const query = location && queryString.parse(location.search);
  const { token } = query || {};

  const fetchMnemonic = async () => {
    const { data, errors } = await getMnemonicFromToken(token);
    if (errors || !data)
      throw new Error(errors);
    const mnemonic = data;
    return mnemonic;
  };

  const goToDashboard = () => {
    return history.push('/');
  };

  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      const mnemonic = await fetchMnemonic();
      const decrypted = await decryptMnemonicWallet(mnemonic);
      const encrypted = await encryptWallet(decrypted, newPassword);
      const data = { 
        token,
        password: newPassword, 
        encryptedWallet: encrypted 
      };
      await changeRecoverPassword(data);
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

  const renderForm = () => {
    return (
      <div>
        {!successfulUpdate && (
          <div>
            <Spin spinning={loading}>
              <h1>CIRCLE OF ANGELS</h1>
              <h2>CHANGE YOUR PASSWORD</h2>
              <DynamicFormForgotPassword onSubmit={updatePassword} />
            </Spin>
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
      </div>
    </div>
  );
}

export default ForgotPassword;
