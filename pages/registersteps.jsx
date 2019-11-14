/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router';

import RegisterForm from '../components/organisms/FormRegister/FormRegister';
import './_register-steps.scss';
import './_style.scss';

import RegisterStep1, {
  step1Inputs
} from '../components/organisms/FormRegister/steps/RegisterStep1';
import RegisterStep2, {
  step2Inputs
} from '../components/organisms/FormRegister/steps/RegisterStep2';
import RegisterStep3, {
  step3Inputs
} from '../components/organisms/FormRegister/steps/RegisterStep3';
import { register } from '../api/userApi';

const steps = [
  {
    fields: Object.keys(step2Inputs),
    component: RegisterStep2
  },
  {
    fields: Object.keys(step1Inputs),
    component: RegisterStep1
  },
  {
    fields: Object.keys(step3Inputs),
    component: RegisterStep3
  }
];

let fields = {
  ...step1Inputs,
  ...step2Inputs,
  ...step3Inputs
};

export default function Registersteps() {
  const history = useHistory();

  const registerUser = fieldsValues => {
    const values = Object.values(fieldsValues).reduce(
      (acc, field) => Object.assign(acc, { [field.name]: field.value }),
      {}
    );

    register(values)
      .then(res =>
        // TODO redirect to dashboard and show congrats message there
        history.push('/')
      )
      // TODO give feedback to user
      .catch(err => console.error('Error', err));
  };

  return (
    <div className="RegisterWrapper">
      <Row
        className="TopBar"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col className="gutter-row" xs={10} sm={4} lg={4}>
          <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
        </Col>
        <Col
          className="gutter-row"
          xs={12}
          sm={{ span: 7, offset: 10 }}
          lg={{ span: 4, offset: 13 }}
        >
          Already Registered? <a href="/login">Log In</a>
        </Col>
      </Row>
      <RegisterForm
        formFields={fields}
        formSteps={steps}
        initialStep={0}
        registerUser={registerUser}
      />
    </div>
  );
}
