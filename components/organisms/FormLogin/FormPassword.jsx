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
import 'antd/dist/antd.css';
import './_style.scss';

const FormPassword = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;

  const submit = () => {
    form.validateFields(err => {
      if (!err) {
        return onSubmit(getFieldProps('newpassword').value);
      }
    });
  };

  const comparePasswords = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('newpassword')) {
      callback('Passwords do not match!');
    } else {
      callback();
    }
  };

  return (
    <Form className="recovery-form" onSubmit={submit}>
      <Form.Item>
        {getFieldDecorator('newpassword', {
          rules: [{ required: true, message: 'Please input your password!' }]
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
            { required: true, message: 'Please input your password!' },
            {
              validator: comparePasswords
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Confirm Password"
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
