/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import '../../../pages/_style.scss';
import '../../../pages/registersteps';
import { Steps } from 'antd';

import CustomButton from '../../atoms/CustomButton/CustomButton';
import useMultiStepForm from '../../../hooks/useMultiStepForm';

const { Step } = Steps;

// TODO : refactor as functional component
function RegisterForm({ formFields, formSteps, initialStep }) {
  // TODO : this cannot be here!
  function finishForm(fields) {
    const values = Object.values(fields).reduce(
      (acc, field) => Object.assign(acc, { [field.name]: field.value }),
      {}
    );

    // TODO : send data to register endpoint
    console.log('complete form', values);
  }

  const [
    fields,
    setFields,
    steps,
    setNextStep,
    currentStep,
    setCurrentStep,
    handleChange,
    handleSubmit
  ] = useMultiStepForm(formFields, formSteps, initialStep, finishForm);

  const isLast = step => step === steps.length - 1;

  function next(e) {
    const last = isLast(currentStep);

    // TODO : weird
    if (handleSubmit(e, last) && !last) {
      console.log('next step!', currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  }

  function prev() {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }

  const isFormValid = () => Object.values(fields).every(i => i.valid);

  function getNextStepButton(current) {
    return (
      <CustomButton
        theme="Primary"
        buttonText={isLast(current) ? 'Finish!' : 'Save and continue'}
        onClick={next}
        disabled={!isFormValid}
      />
    );
  }

  function getPrevStepButton(current) {
    if (current === 0) return;

    return (
      <CustomButton theme="Secondary" buttonText="Previous" onClick={prev} />
    );
  }
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
