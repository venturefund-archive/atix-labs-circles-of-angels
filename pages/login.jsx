/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useContext } from 'react';
import Routing from '../components/utils/Routes';
import { showModalError } from '../components/utils/Modals';
import DynamicForm from '../components/organisms/FormLogin/FormLogin';
import { UserContext } from '../components/utils/UserContext';
import { loginUser } from '../api/userApi';

import './_login.scss';
import UserRegistrationStatus from '../constants/UserRegistrationStatus';

function Login(props) {
  const userContext = useContext(UserContext);
  const { removeUser, changeUser } = userContext;

  const onLoginSubmit = async (email, pwd) => {
    if (email && pwd && email !== '' && pwd !== '') {
      const response = await loginUser(email, pwd);

      if (response.error) {
        const { error } = response;
        const title = error.response ? 'Hello!' : error.message;
        let content = (
          <div>
            There was an error logging in! Please try to log-in again later or
            send an email to{' '}
            <a href="mailto:hello@circlesofangels.com">
              hello@circlesofangels.com
            </a>
          </div>
        );
        if (error.response && error.response.data) {
          const { data } = error.response;
          if (data.error.user) {
            if (
              data.error.user.registrationStatus ===
              UserRegistrationStatus.PENDING_APPROVAL
            ) {
              content = (
                <div>
                  We are reviewing your account details. Please try to log-in
                  again later or send an email to{' '}
                  <a href="mailto:hello@circlesofangels.com">
                    hello@circlesofangels.com
                  </a>
                </div>
              );
            } else if (
              data.error.user.registrationStatus ===
              UserRegistrationStatus.REJECTED
            ) {
              content = (
                <div>
                  There has been an issue with your account. Please contact us
                  at{' '}
                  <a href="mailto:hello@circlesofangels.com">
                    hello@circlesofangels.com
                  </a>
                </div>
              );
            }
          } else {
            content = error.response
              ? error.response.data.error.error
              : error.message;
          }
        }
        showModalError(title, content);
        return response;
      }

      const user = response.data;
      changeUser(user);
      Routing.toUserHome(user);
    }
  };

  return (
    <div className="Login">
      <div className="LogoSide">
        <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
      </div>
      <div className="FormSide">
        <h1>CIRCLES OF ANGELS</h1>
        <h2>PLEASE SIGN IN</h2>
        <DynamicForm onSubmit={onLoginSubmit} />
      </div>
    </div>
  );
}

export default Login;
