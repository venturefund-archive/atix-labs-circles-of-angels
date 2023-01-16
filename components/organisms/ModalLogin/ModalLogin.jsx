/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import './_style.scss';
import { useHistory } from 'react-router';
import { ACCESS_TOKEN_KEY } from 'constants/constants';
import { UserContext } from '../../utils/UserContext';
import DynamicForm from '../FormLogin/FormLogin';
import ModalRecovery from '../ModalRecovery/ModalRecovery';
import { loginUser } from '../../../api/userApi';
import LogoWrapper from '../../atoms/LogoWrapper';

const ModalLogin = ({ setVisibility, visibility }) => {
  const context = useContext(UserContext);
  const { changeUser } = context || { changeUser: () => {} };
  const [onLoginRoute, setOnLoginRoute] = useState(false);
  const [closable, setClosable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setOnLoginRoute(history.location.pathname.includes('/login'));
  }, [history.location.pathname]);

  useEffect(() => {
    if (onLoginRoute) {
      setVisibility(true);
      setClosable(false);
    }
  }, [onLoginRoute, setVisibility]);

  const onLoginSubmit = async (email, pwd, clearFields) => {
    // Return an object to provide feedback after submitting
    const result = {};
    if (!email || !pwd || email === '' || pwd === '') {
      result.error = 'Must add fields';
      return result;
    }
    try {
      const { status, errors, data: user, headers } = await loginUser(email, pwd);

      if (status !== 200) {
        message.error(errors);
        return { error: errors };
      }
      if (!user) return { error: 'User not found' };

      changeUser(user);
      const authorization = headers?.authorization;
      if (authorization) sessionStorage.setItem(ACCESS_TOKEN_KEY, authorization);
      result.user = user;

      const { isAdmin, forcePasswordChange, pin } = user;

      let nextRoute = `/${history.location.pathname.split('/')[1]}`;

      if (!pin) {
        nextRoute = 'secret-key';
      } else if (forcePasswordChange) {
        nextRoute = 'password-change';
      } else if (isAdmin) {
        nextRoute = '/back-office/projects';
      }

      clearFields();
      setVisibility(false);
      history.push(nextRoute);
    } catch (e) {
      if (e !== 'Invalid user or password') {
        message.error(e);
      }
      result.error = e;
    }
    return result;
  };

  return (
    <Modal
      visible={visibility}
      onOk={() => setVisibility(false)}
      onCancel={() => setVisibility(false)}
      className="ModalLogin"
      closable={closable}
      mask={!onLoginRoute}
      maskClosable={closable}
      footer={null}
    >
      <LogoWrapper textTitle="Log In" />
      <DynamicForm onSubmit={onLoginSubmit} />
      <div className="flex link">
        <ModalRecovery />
      </div>
    </Modal>
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
