/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Modal, message, Form, Input, Divider } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import DynamicForm from '../FormLogin/FormLogin';

class ModalRecovery extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

render() {
    return (
      <div>
        <CustomButton theme="Secondary" buttonText="Forgot your password?" onClick={this.showModal} />
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="ModalLogin"
          width="400"
          footer={null}
        >
         <TitlePage textTitle="Recovery Password" />
          <Form className="login-form">
          <Form.Item
            label="Your Email"
            name="email"
          >
            <Input />
          </Form.Item>
           <Form.Item>
            <CustomButton
              theme="Primary"
              buttonText="Send Mail"
            />
           </Form.Item>
          </Form>
          <p>We will send you an E-mail containing a link to reset your Password</p>

          {/* Cuando haces click en send, la pagina re refresca a este mensaje siguiente */}

          <TitlePage textTitle="E-mail send" />
          <h4>Check your inbox</h4>
          <p>We have send an e-mail to your inbox. Please check your mail and click on the password reset link to change your password.</p>
          <Divider/>
          <h4>Did not receive the E-mail?</h4>
          <p>Please check your spam folder. If it´s not there then please <a>click here to send a new link</a></p>

          {/* Cuando haces click desde el mail, te trae a la siguiente pantalla */}

           <TitlePage textTitle="Recovery Password" />
           <Form className="login-form">
            <Form.Item
              label="Password"
              name="Password"
            >
              <Input />
            </Form.Item>
                        <Form.Item
              label="Repeat Password"
              name="Repeatpass"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <CustomButton
                theme="Primary"
                buttonText="Create new password"
              />
           </Form.Item>
          </Form>

        </Modal>
      </div>
    );
  }
}

export default ModalRecovery;

