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

  const onLoginSubmit = async (email, pwd) => {
    if (email && pwd && email !== '' && pwd !== '') {
      const response = await loginUser(email, pwd);

      // TODO : handle errors

      const user = response.data;
      
      changeUser(user);
      history.push('/explore-projects')
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
