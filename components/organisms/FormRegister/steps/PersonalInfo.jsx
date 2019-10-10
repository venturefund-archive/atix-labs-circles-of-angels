/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Input, Icon, Select } from 'antd';
// import { formRules } from '../FormRegister';
import RegistrationStep from './RegistrationStep';
// import RegistrationStep from './RegistrationStep';
// import './_style.scss';

const formRules = {
  name: [
    {
      required: true,
      message: 'Please input your name!',
      whitespace: true
    }
  ],
  email: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!'
    },
    {
      required: true,
      message: 'Please input your E-mail!'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input your password!'
    }
  ]
};

class PersonalInfo extends RegistrationStep {
  constructor(props) {
    super(props)
    // console.log('bbb', props);
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: formRules.name
          })(
            <Input
              placeholder="Full Name"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: formRules.email
          })(
            <Input
              placeholder="E-mail"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: formRules.password
          })(
            <Input
              placeholder="Password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
            />
          )}
        </Form.Item>
      </div>
    );
  }
}

// // const FormRegister = Form.create({ name: 'AngelsForm' })(AngelsForm);
const PersonalInfoStep = Form.create({ name: 'PersonalInfo'})(PersonalInfo)

export default PersonalInfoStep;
