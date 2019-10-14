/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import './_style.scss';
import RegisterStep from '../FormRegister/steps/RegisterStep';

const OptionsUsers = ({ title, usertype }) => (
  <Col sm={24} md={8} lg={8}>
    <div className="OptionsUsers">
      <img src="./static/images/icon-users-small.svg" alt="platformusers" />
      <h1>{title}</h1>
      <p>{usertype}</p>
    </div>
  </Col>
);

export const step2Inputs = {
  // funder, oracle

  // TODO : should allow custom keys like title?
  entrepreneur: {
    name: 'entrepreneur',
    label: 'Social Entrepreneur',
    placeholder: 'First name',
    title: "Create a project"
    rules: [
      {
        required: true,
        message: 'Please input your name!',
        whitespace: true
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

export default function RegisterStep2(props) {
  const { inputs, setInputs } = props;
  // <FormInput {...inputs.fName} setInputs={setInputs} />

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
          <OptionsUsers
            title="Create a Project"
            usertype="Social Entrepreneur"
          />
          <OptionsUsers title="Fund a Project" usertype="Impact Funder" />
          <OptionsUsers title="Monitor a Project" usertype="Oracle" />
        </Row>
      </div>
    </div>
  );
}

// class RegisterStep2 extends RegisterStep {
//   constructor(props) {
//     super(props);
//     console.log('step 2', props);
//   }

//   render() {

// }

// export default RegisterStep2;
