/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import PropTypes from 'prop-types';
import React from 'react';
import CoaModal from 'components/atoms/CoaModal/CoaModal';
import { Button, Form, Input } from 'antd';
import './_style.scss';
import LogoWrapper from '../../atoms/LogoWrapper';

const FormPassword = ({ form, onSubmit, visible, setVisible }) => {
  const { getFieldDecorator, getFieldProps } = form;

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
    <CoaModal
      visible={visible}
      closable={false}
      mask={false}
      maskClosable={false}
      onCancel={() => setVisible(false)}
      footer={(
        <Button className="CoaModal__Primary" onClick={submit}>
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
    </CoaModal>
  );
};

const DynamicFormChangePassword = Form.create({ name: 'FormChangePassword' })(
  FormPassword
);

export default DynamicFormChangePassword;

FormPassword.defaultProps = {
  visible: false,
  setVisible: () => undefined
}

FormPassword.propTypes = {
  form: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  setVisible: PropTypes.func
};
