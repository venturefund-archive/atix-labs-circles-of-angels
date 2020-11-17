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
import RegisterStep3, {
  questionsByRole
} from '../../components/organisms/FormRegister/steps/RegisterStep3/RegisterStep3';
import {
  step1Inputs,
  step2Inputs,
  step3Inputs
} from '../../components/organisms/FormRegister/steps/stepsInputs';
import { register, getCountries } from '../../api/userApi';
import useFormSubmitEffect from '../../hooks/useFormSubmitEffect';
import Loading from '../../components/molecules/Loading/Loading';
import userRoles from '../../constants/RolesMap';
import { createNewWallet } from '../../helpers/blockchain/wallet';

const REGISTER_ROLES = [userRoles.ENTREPRENEUR, userRoles.PROJECT_SUPPORTER];

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

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      const countryOptions = response
        ? response.map(({ id, name }) => ({
            value: id,
            name
          }))
        : [];
      setCountries(countryOptions);
    } catch (error) {
      message.error(error);
    }
  };

  const registerUser = async () => {
    const values = Object.values(formValues).reduce(
      (acc, field) => Object.assign(acc, { [field.name]: field.value }),
      {}
    );

    const { mnemonic, address, encryptedWallet } = await createNewWallet(
      values.password
    );
    await register(values, { address, encryptedWallet });
    return { mnemonic, address };
  };

  const successCallback = wallet => {
    setIsSubmitting(false);
    // TODO: show mnemonic and address to user
    message.success('The user has been registered successfully!');
    return history.push('/landing');
  };

  const errorCallback = error => {
    setIsSubmitting(false);
    message.error(error);
  };

  const setQuestionsByRole = selectedRole => {
    if (selectedRole) {
      steps[2].fields = Object.keys(questionsByRole[role]);
      const questions = questionsByRole[selectedRole];
      setFields({
        ...fields,
        ...questions,
        role: { ...fields.role, value: selectedRole }
      });
    }
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
    if (role && !REGISTER_ROLES.includes(role))
      return history.push('/register');
    setQuestionsByRole(role);
  }, [role]);

  useEffect(() => {
    if (!countries.length) return;

    const step2 = Object.assign({}, step2Inputs, {
      country: Object.assign({}, step2Inputs.country, { options: countries })
    });

    setFields({ ...fields, ...step2 });
    setLoading(false);
  }, [countries]);

  // TODO: add loading when form is submitting

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
