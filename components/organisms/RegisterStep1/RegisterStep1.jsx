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

export const step1Inputs = {
  fName: {
    name: 'fName',
    label: 'First name',
    placeholder: 'First name',
    rules: [
      {
        required: true,
        message: 'Please input your name!',
        whitespace: true
      }
    ]
  },
  lName: {
    name: 'lName',
    label: 'Last name',
    placeholder: 'Last name',
    rules: [
      {
        required: true,
        message: 'Please input your name!',
        whitespace: true
      }
    ]
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    rules: [
      {
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'The input is not valid E-mail!'
      },
      {
        required: true,
        message: 'Please input your E-mail!'
      }
    ]
  },
  password: {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    rules: [
      {
        required: true,
        message: 'Please input your password!'
      }
    ]
  },
  repeatPassword: {
    name: 'repeatPassword',
    label: 'Repeat password',
    placeholder: 'Repeat password',
    valid: true,
    rules: [
      {
        required: true,
        message: 'Please repeat your password'
      },
      {
        validator: ({ rule, value, inputs }) => {
          // console.log(value, password);
          if (value !== inputs.password.value) {
            return 'Password should match';
          }
          return false;
        }
      }
    ]
  }
};

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
function FormInput(props) {
  const {
    name,
    label,
    placeholder,
    value,
    valid,
    errorMessage,
    setInputs
  } = props;

  return (
    <Form.Item
      label={label}
      validateStatus={valid ? 'success' : 'error'}
      help={errorMessage}
    >
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        size="large"
        onChange={setInputs}
      />
    </Form.Item>
  );
}

export default function RegisterStep1(props) {
  const { inputs, setInputs } = props;
  return (
    <div>
      <div className="InfoStep">
        <img src="./static/images/icon-personal.svg" alt="Circles of Angels" />
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
              <FormInput {...inputs.fName} setInputs={setInputs} />
            </Col>
            <Col className="gutter-row" sm={24} lg={12}>
              <FormInput {...inputs.lName} setInputs={setInputs} />
            </Col>
            <Col className="gutter-row" sm={12} lg={6}>
              <Form.Item label="Country">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" sm={12} lg={6}>
              <FormInput {...inputs.email} setInputs={setInputs} />
            </Col>
            <Col className="gutter-row" sm={12} lg={6}>
              <FormInput {...inputs.password} setInputs={setInputs} />
            </Col>
            <Col className="gutter-row" sm={12} lg={6}>
              <FormInput {...inputs.repeatPassword} setInputs={setInputs} />
            </Col>
          </Form>
          <Col className="gutter-row" sm={24} lg={12}>
            <Checkbox>
              I’ve read and accept all the <a href="/">Terms and Conditions</a>{' '}
              of the site.
            </Checkbox>
          </Col>
        </Row>
      </div>
    </div>
  );
}
