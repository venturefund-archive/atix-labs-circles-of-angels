/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { message } from 'antd';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import RegisterForm from '../../components/organisms/FormRegister/FormRegister';
import './_register-steps.scss';
import '../_style.scss';
import RegisterStepsHeader from './RegisterStepsHeader';
import RegisterStep1 from '../../components/organisms/FormRegister/steps/RegisterStep1/RegisterStep1';
import RegisterStep2 from '../../components/organisms/FormRegister/steps/RegisterStep2/RegisterStep2';
import RegisterStep3, {
  step3Inputs
} from '../../components/organisms/FormRegister/steps/RegisterStep3/RegisterStep3';
import {
  step1Inputs,
  step2Inputs
} from '../../components/organisms/FormRegister/steps/stepsInputs';
import { register } from '../../api/userApi';
import useFormSubmitEffect from '../../hooks/useFormSubmitEffect';

const steps = [
  {
    fields: Object.keys(step1Inputs),
    component: RegisterStep1
  },
  {
    fields: Object.keys(step2Inputs),
    component: RegisterStep2
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

function Registersteps() {
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({});

  const registerUser = () => {
    const values = Object.values(formValues).reduce(
      (acc, field) => Object.assign(acc, { [field.name]: field.value }),
      {}
    );

    return register(values);
  };

  const successCallback = () => {
    setIsSubmitting(false);
    message.success('The user has been registered successfully!');
    return history.push('/login');
  };

  const errorCallback = err => {
    setIsSubmitting(false);
    message.error('An error ocurred while creating your account');
    console.error('Error', err);
  };

  useFormSubmitEffect({
    apiCall: registerUser,
    successCallback,
    errorCallback,
    params: { isSubmitting, formValues }
  });

  // TODO add loading when form is submitting

  const query = location && queryString.parse(location.search);
  const { role } = query || {};
  const initialStep = !role ? 0 : 1;

  // TODO : check if its a valid role.
  if (!role) fields.role.value = role;

  return (
    <div className="RegisterWrapper">
      <RegisterStepsHeader />
      <RegisterForm
        formFields={fields}
        formSteps={steps}
        initialStep={initialStep}
        registerUser={values => {
          setIsSubmitting(true);
          setFormValues(values);
        }}
      />
    </div>
  );
}

export default Registersteps;
