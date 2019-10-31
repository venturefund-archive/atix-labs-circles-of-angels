/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Icon, Input, Checkbox } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';
import Routing from '../../utils/Routes';

const FormLogin = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;
  const submit = e => {
    e.preventDefault();
    form.validateFields();
    onSubmit(getFieldProps('userName').value, getFieldProps('password').value);
  };
  return (
    <Form className="login-form" onSubmit={submit}>
      <Form.Item label="Username">
        {getFieldDecorator('userName', {
          rules: [{ message: 'Please input your username!' }]
        })(<Input size="large" />)}
      </Form.Item>
      <Form.Item label="Password">
        {getFieldDecorator('password', {
          rules: [{ message: 'Please input your Password!' }]
        })(<Input size="large" type="password" />)}
      </Form.Item>
      <Form.Item>
        <CustomButton
          theme="Primary"
          buttonText="Sign In"
          onClick={submit}
          htmlType="submit"
        />
      </Form.Item>
      <Form.Item>
        <div className="FormControls flex link">
          <a
            className="login-form-forgot"
            onClick={() => Routing.toRecoveryPassword()}
          >
            Forgot your password?
          </a>
        </div>
      </Form.Item>
    </Form>
  );
};

const DynamicForm = Form.create({ name: 'FormLogin' })(FormLogin);

export default DynamicForm;
