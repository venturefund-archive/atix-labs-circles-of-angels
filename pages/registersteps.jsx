/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
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
import useFormSubmitEffect from '../hooks/useFormSubmitEffect';

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

const fields = {
  ...step1Inputs,
  ...step2Inputs,
  ...step3Inputs
};

const registerUser = ({ setIsSubmitting, formValues, history }) => {
  const values = Object.values(formValues).reduce(
    (acc, field) => Object.assign(acc, { [field.name]: field.value }),
    {}
  );

  return register(values);
};

export default function Registersteps() {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({});

  // TODO redirect to dashboard and show feedback
  const successCallback = res => {
    setIsSubmitting(false);
    return history.push('/login');
  };

  // TODO validate with UX team
  const errorCallback = err => {
    setIsSubmitting(false);
    message.error('An error ocurred while creating your account');
    return console.error('Error', err);
  };

  useFormSubmitEffect({
    apiCall: registerUser,
    successCallback,
    errorCallback,
    params: { isSubmitting, formValues }
  });

  // TODO add loading when form is submitting
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
        registerUser={values => {
          setIsSubmitting(true);
          setFormValues(values);
        }}
      />
    </div>
  );
}
