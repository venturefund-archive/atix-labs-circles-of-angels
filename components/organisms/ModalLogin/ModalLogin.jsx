/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col, Divider, Modal } from 'antd';
import './_style.scss';
import { useHistory } from 'react-router';
import { withUser } from '../../utils/UserContext';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import DynamicForm from '../FormLogin/FormLogin';
import { loginUser } from '../../../api/userApi';
import { showModalError } from '../../utils/Modals';
import Roles from '../../../constants/RolesMap';

function ModalLogin({ setVisibility, visibility, changeUser }) {
  const history = useHistory();

  const redirectUser = user => {
    if (!user) return setVisibility(false);

    return user.role.id === Roles.BackofficeAdmin
      ? history.push('/back-office-projects')
      : history.push('/explore-projects');
  };

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
      redirectUser(user);
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
}

export default withUser(ModalLogin);
