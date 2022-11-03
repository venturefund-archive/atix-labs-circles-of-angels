/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal } from 'antd';
import './_style.scss';
import LogoWrapper from '../../atoms/LogoWrapper';

const FormPassword = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;
  const [modalVisible, setModalVisible] = useState(true)

  const submit = () => {
    form.validateFields(err => {
      if (!err) {
        return onSubmit(
          getFieldProps('password').value,
          getFieldProps('confirm').value
        );
      }
    });
  };

  const validPasswords = (_rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match!');
    } else {
      callback();
    }
  };

  const validateNewPassword = (_rule, value, callback) => {
    const regexPassword = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
    );
    if (value && !regexPassword.test(value)) {
      callback(
        'Your password must have the following:\n- At least 8 characters\n- At least 1 lowercase character\n- At least 1 uppercase character\n- At least 1 numeric character.'
      );
    } else {
      callback();
    }
  };

  return (
    <Modal
      visible={modalVisible}
      closable={true}
      mask={false}
      maskClosable
      onCancel={() => setModalVisible(false)}
      width="400"
      zIndex={9999}
      className="ModalLogin ResetPassword"
      footer={(
        <Button className="ant-btn ant-btn-primary" onClick={submit}>
          Change password
        </Button>
      )}
    >
      <LogoWrapper textTitle="Change password" />
      <Form className="recovery-form changepassword-form" onSubmit={submit}>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your new password!' },
              {
                validator: validateNewPassword
              }
            ]
          })(<Input.Password placeholder="New Password" />)}
        </Form.Item>
        <Form.Item label="Confirm password">
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: 'Please input your new password!' },
              {
                validator: validPasswords
              }
            ]
          })(<Input.Password placeholder="Repeat your new password" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const DynamicFormChangePassword = Form.create({ name: 'FormChangePassword' })(
  FormPassword
);

export default DynamicFormChangePassword;

FormPassword.propTypes = {
  form: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired
};
