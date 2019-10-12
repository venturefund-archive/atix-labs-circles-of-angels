/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import RegisterStep from '../FormRegister/steps/RegisterStep';

const formRules = {
  firstName: [
    {
      required: true,
      message: 'Please input your name!',
      whitespace: true
    }
  ],
  lastName: [
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
  ],
  repeatPassword: [
    {
      required: true,
      message: 'Please repeat your password'
    },
    {
      validator: (rule, value, callback) => {
        const password = this.props.form.getFieldValue('password');
        console.log(value, password);
        if (value && value !== password) {
          callback('Password should match');
        } else {
          callback();
        }
      }
    }
  ]
};

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
function FormInput(props) {
  const { name, rules, label, placeholder, getFieldDecorator } = props;
  
  return (
    <Form.Item label={label}>
      {getFieldDecorator(name, { rules })(
        <Input placeholder={placeholder} size="large" />
      )}
    </Form.Item>
  );
}

class RegisterStep1 extends RegisterStep {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log('props', this.props);
    return (
      <div>
        <div className="InfoStep">
          <img
            src="./static/images/icon-personal.svg"
            alt="Circles of Angels"
          />
          <h2> Personal Information</h2>
          <h4>
            Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
            amet..
          </h4>
        </div>
        <div className="StepPersonalInformation">
          <TitlePage textTitle="Register" />
          <CustomButton
            theme="Facebook"
            buttonText="Register with Facebook Account"
          />
          <div className="flex Linear">
            <hr />
            <p>or register with</p>
            <hr />
          </div>
          <Row className="FormRegister" gutter={26}>
            <Form layout="vertical">
              <Col className="gutter-row" sm={24} lg={12}>
                <FormInput
                  name="firstName"
                  label="First name"
                  placeholder="First name"
                  rules={formRules.firstName}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
              <Col className="gutter-row" sm={24} lg={12}>
                <FormInput
                  name="lastName"
                  label="Last name"
                  placeholder="Last name"
                  rules={formRules.lastName}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
              <Col className="gutter-row" sm={12} lg={6}>
                <Form.Item label="Country">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" sm={12} lg={6}>
                <FormInput
                  name="email"
                  label="Email"
                  placeholder="Email"
                  rules={formRules.email}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
              <Col className="gutter-row" sm={12} lg={6}>
                <FormInput
                  name="password"
                  label="Password"
                  placeholder="Password"
                  rules={formRules.password}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
              <Col className="gutter-row" sm={12} lg={6}>
                <FormInput
                  name="repeatPassword"
                  label="Password"
                  placeholder="Password"
                  rules={formRules.repeatPassword}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
            </Form>
            <Col className="gutter-row" sm={24} lg={12}>
              <Checkbox>
                I’ve read and accept all the{' '}
                <a href="/">Terms and Conditions</a> of the site.
              </Checkbox>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'RegisterStep1' })(RegisterStep1);

// export default PersonalInfoStep;

// export default RegisterStep1;
