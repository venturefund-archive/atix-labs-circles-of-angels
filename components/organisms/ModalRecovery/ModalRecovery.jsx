/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Modal, Form, Input, Divider } from 'antd';
import './_style.scss';
import { recoverPassword } from '../../../api/userApi';
import { showModalError, showModalSuccess } from '../../../components/utils/Modals';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';

const ModalRecovery = () => {
  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState('');

  const onChange = event => {
    const newValue = event.target.value;
    console.log(newValue);
    setEmail(newValue);
  };

  const showModal = () => {
    setVisibility(true);
  };

  const handleOk = e => {
    setVisibility(false);
  };

  const handleCancel = e => {
    setVisibility(false);
  };

  const handleSubmit = async () => {
    console.log(email);
    if (!email) {
      showModalError('Error!', 'Please complete your email');
      return false;
    }
    const data = { email };
    const response = await recoverPassword(data);
    console.log(response);
    if (response.error) {
      const { error } = response;
      const title = error.response ? 'Error!' : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    } else {
      showModalSuccess(
        'Success!',
        'A mail has been sent to you. Please check your inbox!'
      );
    }
    return response;
  };

  return (
    <div>
      <CustomButton
        theme="Secondary"
        buttonText="Forgot your password?"
        onClick={showModal}
      />
      <Modal
        visible={visibility}
        onOk={handleOk}
        onCancel={handleCancel}
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
            <Input onChange={onChange} />
          </Form.Item>
          <Form.Item>
            <CustomButton           
              onClick={handleSubmit}
              theme="Primary" 
              buttonText="Send Mail" 
            />
          </Form.Item>
        </Form>
        <p>
          We will send you an E-mail containing a link to reset your Password
        </p>

        {/* Cuando haces click en send, la pagina re refresca a este mensaje siguiente */}

        {/* <TitlePage textTitle="E-mail send" />
        <h4>Check your inbox</h4>
        <p>
          We have send an e-mail to your inbox. Please check your mail and
          click on the password reset link to change your password.
        </p>
        <Divider />
        <h4>Did not receive the E-mail?</h4>
        <p>
          Please check your spam folder. If it´s not there then please{' '}
          <a>click here to send a new link</a>
        </p> */}

        {/* Cuando haces click desde el mail, te trae a la siguiente pantalla */}

        {/* <TitlePage textTitle="Recovery Password" />
        <Form className="login-form">
          <Form.Item label="Password" name="Password">
            <Input />
          </Form.Item>
          <Form.Item label="Repeat Password" name="Repeatpass">
            <Input />
          </Form.Item>
          <Form.Item>
            <CustomButton theme="Primary" buttonText="Create new password" />
          </Form.Item>
        </Form> */}
      </Modal>
    </div>
  );
}

export default ModalRecovery;