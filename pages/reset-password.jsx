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
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import './_login.scss';
import './landing/_landing.scss';
import DynamicFormChangePassword from '../components/organisms/FormLogin/FormChangePassword'
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
  const { token } = query || {}
  console.log(token)

  const fetchMnemonic = async () => {
    const { data, errors } = await getMnemonicFromToken(token);
    if (errors) throw new Error(errors);
    const mnemonic = data;
    return mnemonic;
  }

  const updatePassword = async newPassword => {
    let data = {};
    try {
      setLoading(true)
      fetchMnemonic()
        .then(mnemonic => {
          data.mnemonic = mnemonic
        })
        .catch(error => {
          // avoid to throw when there's not a mnemonic (genesys user)
          console.log(error)
        })
      if (!data.mnemonic) {
        const {
          mnemonic,
          address,
          encryptedWallet,
        } = await createNewWallet(newPassword);

        data = {
          token,
          password: newPassword,
          address,
          mnemonic,
          encryptedWallet,
        }
      } else {
        const decrypted = generateWalletFromMnemonic(mnemonic)
        const encryptedWallet = await encryptWallet(decrypted)
        const { address } = decrypted
        const mnemonic = data.mnemonic
        data = {
          token,
          password: newPassword,
          address,
          mnemonic,
          encryptedWallet,
        }
      }

      await resetPassword(data);

      //showModalSuccess('Success!', 'Your password was successfully changed!');
      setSuccessfulUpdate(true);
      goToSuccessMessage();
    } catch (error) {
      const title = 'Error';
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content)
    }
    setLoading(false);
  }

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
    <Row className="Landing"
      style={{
        backgroundImage: 'url(./static/images/COA-Login-Image-Background.png)',
        backgroundSize: 'cover',
        backgroundPositionX: 'center'
      }}
    >
      <TopBar/>
      <div>
        {renderForm()}
      </div>
    </Row>
  );
}

export default ResetPassword;
