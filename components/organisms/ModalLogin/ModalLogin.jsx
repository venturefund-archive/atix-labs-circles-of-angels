/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import './_style.scss';
import { withUser, useUserContext } from '../../utils/UserContext';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import DynamicForm from '../FormLogin/FormLogin';
import { loginUser } from '../../../api/userApi';

const ModalLogin = ({ setVisibility, visibility }) => {
  const context = useUserContext();

  const onLoginSubmit = async (email, pwd) => {
    if (!email || !pwd || email === '' || pwd === '') return;

    try {
      const response = await loginUser(email, pwd);
      const user = response.data;
      context.changeUser(user);
    } catch (error) {
      message.error(error.response.data.error.error);
    }
  };

  return (
    <div>
      <Modal
        visible={visibility}
        onOk={() => setVisibility(false)}
        onCancel={() => setVisibility(false)}
        className="ModalLogin"
        width="400"
        footer={null}
      >
        <TitlePage textTitle="Login" />
        <CustomButton theme="Facebook" buttonText="Login with Facebook" />
        <div className="flex Linear">
          <hr />
          <p>or Login with</p>
          <hr />
        </div>
        <DynamicForm onSubmit={onLoginSubmit} />
      </Modal>
    </div>
  );
};

ModalLogin.defaultProps = {
  visibility: false
};

ModalLogin.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool
};

export default withUser(ModalLogin);
