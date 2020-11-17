/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Icon, Input } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

const FormForgotPassword = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;

  const submit = () => {
    form.validateFields(err => {
      if (!err) {
        return onSubmit(
          getFieldProps('newpassword').value
        );
      }
    });
  };

  const validPasswords = (rule, value, callback) => {
    const minPasswordLength = 6;
    if (value && value !== form.getFieldValue('newpassword')) {
      callback('Passwords do not match!');
    } else if (value.length < minPasswordLength) {
      callback('New password is too short!');
    } else {
      callback();
    }
  };

  return (
    <Form className="recovery-form" onSubmit={submit}>
      <Form.Item>
        {getFieldDecorator('newpassword', {
          rules: [{ required: true, message: 'Please input your new password!' }]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="New Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('confirm', {
          rules: [
            { required: true, message: 'Please confirm your new password!' },
            {
              validator: validPasswords
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Confirm new Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <CustomButton theme="Primary" buttonText="Save" onClick={submit} />
      </Form.Item>
    </Form>
  );
};

const DynamicFormForgotPassword = Form.create({ name: 'FormForgotPassword' })(FormForgotPassword);

export default DynamicFormForgotPassword;
