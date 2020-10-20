/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Modal, Form, Input, Divider, Button } from 'antd';
import './_style.scss';
import { recoverPassword } from '../../../api/userApi';
import { showModalError, showModalSuccess } from '../../utils/Modals';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';

const ModalRecovery = () => {
  const [visibility, setVisibility] = useState(false);
  const [successfulSent, setSuccessfulSent] = useState(false);
  const [email, setEmail] = useState('');

  const onChange = event => {
    const newValue = event.target.value;
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

  const handleResend = () => {
    setSuccessfulSent(false);
  };

  const handleSubmit = async () => {
    if (!email) {
      showModalError('Error!', 'Please complete your email');
      return false;
    }
    const data = { email };
    const response = await recoverPassword(data);
    if (response.errors) {
      const { errors } = response;
      const title = 'Error!';
      const content = errors;
      showModalError(title, content);
    } else {
      showModalSuccess(
        'Success!',
        'A mail has been sent to you. Please check your inbox!'
      );
      setSuccessfulSent(true);
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
        {!successfulSent && (
          <div>
            <TitlePage textTitle="Recovery Password" />
            <Form className="login-form">
              <Form.Item label="Your Email" name="email">
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
              We will send you an E-mail containing a link to reset your
              Password
            </p>
          </div>
        )}
        {successfulSent && (
          <div>
            <TitlePage textTitle="E-mail send" />
            <h4>Check your inbox</h4>
            <p>
              We have send an e-mail to your inbox. Please check your mail and
              click on the password reset link to change your password.
            </p>
            <Divider />
            <h4>Did not receive the E-mail?</h4>
            <p>
              Please check your spam folder. If it´s not there then please{' '}
              <Button type="link" onClick={handleResend}>
                click here to send a new link
              </Button>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalRecovery;
