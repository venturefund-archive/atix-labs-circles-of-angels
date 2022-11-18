/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Spin } from 'antd';
import queryString from 'query-string';
import Navigation from 'components/organisms/Navigation';
import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalLogin from 'components/organisms/ModalLogin/ModalLogin';
import { showModalError } from '../components/utils/Modals';
import './_login.scss';
import './landing/_landing.scss';
import DynamicFormChangePassword from '../components/organisms/FormLogin/FormChangePassword';
import { resetPassword } from '../api/userApi';
import ModalChangePasswordSuccess from 'components/organisms/ModalChangePasswordSuccess/ModalChangePasswordSuccess';

function ResetPassword() {
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const query = window.location && queryString.parse(window.location.search);
  const { token } = query || {};

  const updatePassword = async newPassword => {
    let data = { token, password: newPassword };
    setLoading(true);
    try {
      const { errors, first = true } = await resetPassword(data);
      if (!errors) {
        if (first) {
          setSuccessModalOpen(true)
        }
        setSuccessfulUpdate(true);
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
    <BackgroundLanding>
      <Navigation
        setModalOpen={setModalOpen}
      />
      <ModalLogin
        visibility={modalOpen}
        setVisibility={setModalOpen}
      >
      </ModalLogin>
      <div>{renderForm()}</div>
      <ModalChangePasswordSuccess visible={successModalOpen} />
    </BackgroundLanding>
  );
}

export default ResetPassword;
