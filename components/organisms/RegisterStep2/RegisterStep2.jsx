/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col, Radio } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import './_style.scss';

export const step2Inputs = {
  // TODO : should allow custom keys?
  role: {
    name: 'role',
    options: [
      {
        name: 'entrepreneur',
        usertype: 'Social Entrepreneur',
        title: 'Create a project',
        rules: [
          {
            required: true,
            message: 'Please input your name!',
            whitespace: true
          }
        ]
      },
      {
        name: 'funder',
        usertype: 'Impact Funder',
        title: 'Create a project',
        rules: [
          {
            required: true,
            message: 'Please input your name!',
            whitespace: true
          }
        ]
      },
      {
        name: 'oracle',
        usertype: 'Oracle',
        title: 'Monitor a project',
        rules: []
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
    handleChange
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
        onChange={handleChange}
      />
    </Form.Item>
  );
}

const RoleOption = props => {
  const { title, usertype, name, value, handleChange } = props;
  console.log(props);
  return (
    <Col sm={24} md={8} lg={8}>
      <div
        onClick={e => handleChange(e, "role", name)}
        name={name}
        selected={value ? 'true' : 'false'}
        className="OptionsUsers"
      >
        <img src="./static/images/icon-users-small.svg" alt="platformusers" />
        <h1>{title}</h1>
        <p>{usertype}</p>
      </div>
    </Col>
  );
};

export default function RegisterStep2(props) {
  const { inputs, handleChange } = props;
  // <FormInput {...inputs.fName} setInputs={setInputs} />
  console.log('a', inputs);

  const roleOptions = inputs.role.options.map(option => (
    <RoleOption handleChange={handleChange} {...option} />
  ));

  return (
    <div>
      <div className="InfoStep">
        <img src="./static/images/icon-users.svg" alt="platformusers" />
        <h2>Platform User</h2>
        <h4>
          Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
          amet..
        </h4>
      </div>
      <div className="StepPersonalInformation">
        <TitlePage textTitle="What do you want to do?" />

        <Row className="FormRegister" gutter={26}>
          {roleOptions}
        </Row>
      </div>
    </div>
  );
}
