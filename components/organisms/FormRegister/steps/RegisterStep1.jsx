/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';

import { Form, Input, Row, Col, Checkbox } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import Field from '../../../atoms/Field/Field';

const countries = ['Argentina', 'Angola', 'Argelia'];
const {
  termsAndConditionsFilePath
} = require('../../../../constants/DocumentPaths');

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
  country: {
    name: 'country',
    type: 'select',
    label: 'Country',
    options: countries,
    rules: [
      {
        required: true,
        message: 'Choose a country!'
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
        validator: (rule, value, inputs) => value === inputs.password.value,
        message: 'Passwords should match'
      }
    ]
  },
  termsAndConditions: {
    name: 'termsAndConditions',
    type: 'checkbox',
    label: (
      <>
        I’ve read and accept all the{' '}
        <a target="_blank" href={termsAndConditionsFilePath}>
          Terms and Conditions
        </a>{' '}
        of the site.
      </>
    ),
    handleChange: () => {},
    rules: [
      {
        validator: (rule, value) => value,
        message: 'Please, agree with terms and conditions to continue'
      }
    ]
  }
};

export default function RegisterStep1(props) {
  const { fields, handleChange } = props;
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
            {/* TODO : we could move the Col tags into the FormInput */}
            <Col className="gutter-row" sm={24} lg={12}>
              <Field {...fields.fName} handleChange={handleChange} />
            </Col>
            <Col className="gutter-row" sm={24} lg={12}>
              <Field {...fields.lName} handleChange={handleChange} />
            </Col>
            <Col className="gutter-row" sm={12} lg={6}>
              <Field {...fields.country} handleChange={handleChange} />
            </Col>
            <Col className="gutter-row" sm={12} lg={6}>
              <Field {...fields.email} handleChange={handleChange} />
            </Col>
            <Col className="gutter-row" sm={12} lg={6}>
              <Field {...fields.password} handleChange={handleChange} />
            </Col>
            <Col className="gutter-row" sm={12} lg={6}>
              <Field {...fields.repeatPassword} handleChange={handleChange} />
            </Col>
            <Col className="gutter-row" sm={24} lg={12}>
              <Field
                {...fields.termsAndConditions}
                handleChange={handleChange}
              />
            </Col>
          </Form>
        </Row>
      </div>
    </div>
  );
}
