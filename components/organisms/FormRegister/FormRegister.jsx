/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import '../../../pages/registerSteps/registersteps';
import { Steps } from 'antd';

import useMultiStepForm from '../../../hooks/useMultiStepForm';

const { Step } = Steps;

function RegisterForm({ formFields, formSteps, initialStep, registerUser }) {
  const [
    fields,
    setFields,
    steps,
    setNextStep,
    currentStep,
    ,
    handleChange,
    getNextStepButton,
    getPrevStepButton
  ] = useMultiStepForm(formFields, formSteps, initialStep, registerUser);

  function getStepComponent(current) {
    const Component = steps[current].component;
    return (
      <Component
        fields={fields}
        setFields={setFields}
        setNextStep={setNextStep}
        handleChange={handleChange}
      />
    );
  }

  return (
    <div className="RegisterSteps">
      <div className="BlockSteps">
        <Steps progressDot current={currentStep}>
          {formSteps.map((item, index) => (
            <Step key={'bleep-'.concat(index)} title={item.title} />
          ))}
        </Steps>
      </div>
      <div className="vertical BlockContent">
        <div className="steps-content">{getStepComponent(currentStep)}</div>
        <div className="steps-action">
          {getNextStepButton(currentStep)}
          {getPrevStepButton(currentStep)}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

RegisterForm.defaultProps = {
  formSteps: [],
  initialStep: 0
};

RegisterForm.propTypes = {
  formFields: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf,
  initialStep: PropTypes.number,
  registerUser: PropTypes.func.isRequired
};
