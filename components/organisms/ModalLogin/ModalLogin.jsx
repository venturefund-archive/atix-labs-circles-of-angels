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
import Routing from '../../utils/Routes';
import { withUser } from '../../utils/UserContext';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import DynamicForm from '../FormLogin/FormLogin';

class ModalLogin extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="WrapperModalLogin">
        <CustomButton
          buttonText="Login"
          theme="Secondary"
          onClick={this.showModal}
          />
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="ModalLogin"
          width="400"
          footer={null}
        >
          <TitlePage textTitle="Login" />
          <CustomButton
            theme="Facebook"
            buttonText="Login with Facebook"
          />
          <div className="flex Linear">
            <hr />
            <p>or Login with</p>
            <hr />
          </div>
          <DynamicForm />
        </Modal>
      </div>
    );
  }
}

export default ModalLogin;
