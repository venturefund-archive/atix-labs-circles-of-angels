/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import RegisterForm from '../../components/organisms/FormRegister/FormRegister';
import './_register-steps.scss';
import '../_style.scss';
import RegisterStepsHeader from './RegisterStepsHeader';
import RegisterStep1 from '../../components/organisms/FormRegister/steps/RegisterStep1/RegisterStep1';
import RegisterStep2 from '../../components/organisms/FormRegister/steps/RegisterStep2/RegisterStep2';
import RegisterStep3 from '../../components/organisms/FormRegister/steps/RegisterStep3/RegisterStep3';
import {
  step1Inputs,
  step2Inputs,
  step3Inputs
} from '../../components/organisms/FormRegister/steps/stepsInputs';
import { register, getCountries } from '../../api/userApi';
import useFormSubmitEffect from '../../hooks/useFormSubmitEffect';
import Loading from '../../components/molecules/Loading/Loading';

const Registersteps = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState({
    ...step1Inputs,
    ...step2Inputs,
    ...step3Inputs
  });

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response);
    } catch (error) {
      message.error(error);
    }
  };

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
    return history.push('/landing');
  };

  const errorCallback = error => {
    setIsSubmitting(false);
    message.error(error);
  };

  useFormSubmitEffect({
    apiCall: registerUser,
    successCallback,
    errorCallback,
    params: { isSubmitting, formValues }
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!countries.length) return;

    const step2 = Object.assign({}, step2Inputs, {
      country: Object.assign({}, step2Inputs.country, { options: countries })
    });

    const stepFields = {
      ...step1Inputs,
      ...step2,
      ...step3Inputs
    };

    setFields(stepFields);
    setLoading(false);
  }, [countries]);

  // TODO add loading when form is submitting

  const query = location && queryString.parse(location.search);
  const { role } = query || {};
  const initialStep = !role ? 0 : 1;
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

  if (loading) return <Loading />;

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
};

export default Registersteps;
