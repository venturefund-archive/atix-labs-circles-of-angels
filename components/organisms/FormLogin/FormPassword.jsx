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

const FormPassword = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;

  const submit = () => {
    form.validateFields(err => {
      if (!err) {
        return onSubmit(
          getFieldProps('currentpassword').value,
          getFieldProps('newpassword').value
        );
      }
    });
  };

  const validPasswords = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('newpassword')) {
      callback('Passwords do not match!');
    } else if (value === form.getFieldValue('currentpassword')) {
      callback('You have to change your password!');
    } else {
      callback();
    }
  };

  const validateNewPassword = (rule, value, callback) => {
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
    <Form className="recovery-form">
      <Form.Item>
        {getFieldDecorator('currentpassword', {
          rules: [
            { required: true, message: 'Please input your current password!' }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Current Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('newpassword', {
          rules: [
            { required: true, message: 'Please input your new password!' },
            {
              validator: validateNewPassword
            }
          ]
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
            { required: true, message: 'Please input your new password!' },
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

const DynamicFormPassword = Form.create({ name: 'FormPassword' })(FormPassword);

export default DynamicFormPassword;
