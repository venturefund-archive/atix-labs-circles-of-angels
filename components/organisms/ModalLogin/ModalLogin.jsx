/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import './_style.scss';
import { useHistory } from 'react-router';
import { useUserContext } from '../../utils/UserContext';
import DynamicForm from '../FormLogin/FormLogin';
import ModalRecovery from '../ModalRecovery/ModalRecovery';
import { loginUser } from '../../../api/userApi';
import { defaultRouteByRole } from '../../../constants/DefaultRouteByRole';
import LogoWrapper from '../../atoms/LogoWrapper';

const ModalLogin = ({ setVisibility, visibility }) => {
  const { changeUser } = useUserContext();
  const [onLoginRoute, setOnLoginRoute] = useState(true);
  const history = useHistory();
  useEffect(() => {
    setOnLoginRoute(window.location.pathname.includes('/login'));
  }, []);

  const onLoginSubmit = async (email, pwd, clearFields) => {
    if (!email || !pwd || email === '' || pwd === '') return;

    try {
      const user = await loginUser(email, pwd);
      changeUser(user);
      const { role, forcePasswordChange } = user;

      if (forcePasswordChange) history.push('/password-change');
      else history.push(defaultRouteByRole[role]);

      clearFields();
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div>
      <Modal
        visible={visibility}
        onOk={() => setVisibility(false)}
        onCancel={() => setVisibility(false)}
        className="ModalLogin"
        mask={!onLoginRoute}
        maskClosable={!onLoginRoute}
        closable={!onLoginRoute}
        footer={null}
      >
        <LogoWrapper textTitle="Log In" />
        <DynamicForm onSubmit={onLoginSubmit} />
        <div className="flex link">
          <ModalRecovery />
        </div>
      </Modal>
    </div>
  );
};

export default ModalLogin;

ModalLogin.defaultProps = {
  visibility: false
};

ModalLogin.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool
};
