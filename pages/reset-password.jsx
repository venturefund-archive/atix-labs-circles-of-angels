/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import queryString from 'query-string';
import Navigation from 'components/organisms/Navigation';
import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalLogin from 'components/organisms/ModalLogin/ModalLogin';
import ModalChangePasswordSuccess from 'components/organisms/ModalChangePasswordSuccess/ModalChangePasswordSuccess';
import ModalInvalidToken from 'components/organisms/ModalInvalidToken/ModalInvalidToken';
import DynamicFormChangePassword from '../components/organisms/FormLogin/FormChangePassword';
import { showModalError } from '../components/utils/Modals';
import './_login.scss';
import './landing/_landing.scss';
import { getTokenStatus, resetPassword } from '../api/userApi';

function ResetPassword() {
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [showTokenExpirationModal, setShowTokenExpirationModal] = useState(false);
  const [first, setFirst] = useState(false);
  const query = window.location && queryString.parse(window.location.search);
  const { token } = query || {};

  const checkTokenStatus = async _token => {
    const response = await getTokenStatus(_token);
    const valid = !response.expired && !response.errors;
    setValidToken(valid);
    setShowTokenExpirationModal(!valid);
    setResetModalOpen(valid);
  };

  useEffect(() => {
    checkTokenStatus(token);
  }, [token]);

  const updatePassword = async newPassword => {
    const data = { token, password: newPassword };
    setLoading(true);
    try {
      const {
        errors,
        data: { first: _first }
      } = await resetPassword(data);
      if (!errors) {
        setSuccessModalOpen(true);
        setSuccessfulUpdate(true);
        setFirst(_first);
      } else {
        showModalError('Error', errors);
      }
    } catch (error) {
      const title = 'Error';
      const content = error.response ? error.response.data.error : error.message;
      showModalError(title, content);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <div>
      {!successfulUpdate && validToken && (
        <div>
          <Spin spinning={loading}>
            <DynamicFormChangePassword
              onSubmit={updatePassword}
              setVisible={setResetModalOpen}
              visible={resetModalOpen}
            />
          </Spin>
        </div>
      )}
    </div>
  );

  return (
    <BackgroundLanding>
      <Navigation setModalOpen={setModalOpen} />
      <ModalLogin visibility={modalOpen} setVisibility={setModalOpen} />
      <div>{renderForm()}</div>
      {showTokenExpirationModal && <ModalInvalidToken />}

      <ModalChangePasswordSuccess visible={successModalOpen} first={first} />
    </BackgroundLanding>
  );
}

export default ResetPassword;
