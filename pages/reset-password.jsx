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
import { Row, Spin } from 'antd';
import queryString from 'query-string';
import { showModalError } from '../components/utils/Modals';
import DynamicFormChangePassword from '../components/organisms/FormLogin/FormChangePassword';
import TopBar from '../components/organisms/TopBar/TopBar';
import { getMnemonicFromToken, resetPassword } from '../api/userApi';
import {
  encryptWallet,
  createNewWallet,
  generateWalletFromMnemonic
} from '../helpers/blockchain/wallet';

function ResetPassword() {
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const goToSuccessMessage = () => history.push('/change-password-success');

  const query = window.location && queryString.parse(window.location.search);
  const { token } = query || {};

  const fetchMnemonic = async () => {
    const { data, errors } = await getMnemonicFromToken(token);
    if (errors) throw new Error(errors);
    const mnemonic = data;
    return mnemonic;
  };

  const updatePassword = async newPassword => {
    let data = { token, password: newPassword };
    setLoading(true);
    try {
      const { mnemonic } = await fetchMnemonic();

      if (mnemonic) {
        const decrypted = generateWalletFromMnemonic(mnemonic);
        const encryptedWallet = await encryptWallet(decrypted);
        const { address } = decrypted;
        data = { ...data, address, mnemonic, encryptedWallet };
      } else {
        const {
          mnemonic: mnemonicCreated,
          address,
          encryptedWallet
        } = await createNewWallet(newPassword);
        data = { ...data, address, mnemonic: mnemonicCreated, encryptedWallet };
      }

      const { errors } = await resetPassword(data);
      if (!errors) {
        setSuccessfulUpdate(true);
        goToSuccessMessage();
      } else {
        showModalError('Error', errors);
      }
    } catch (error) {
      const title = 'Error';
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
            <DynamicFormChangePassword onSubmit={updatePassword} />
          </Spin>
        </div>
      )}
    </div>
  );

  return (
    <Row
      className="Landing"
      style={{
        backgroundImage: 'url(/images/COA-Login-Image-Background.png)',
        backgroundSize: 'cover',
        backgroundPositionX: 'center'
      }}
    >
      <TopBar />
      <div>{renderForm()}</div>
    </Row>
  );
}

export default ResetPassword;
