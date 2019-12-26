/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Steps, message } from 'antd';
import './_steps-milestones.scss';
import '../../../pages/_style.scss';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import FooterButtons from '../FooterButtons/FooterButtons';
import CreateMilestonesStep1 from './Steps/CreateMilestonesStep1';
import CreateMilestonesStep2 from './Steps/CreateMilestonesStep2';
import CreateMilestonesStep3 from './Steps/CreateMilestonesStep3';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import { downloadMilestonesTemplate } from '../../../api/projectApi';
import { milestonesFormItems } from '../../../helpers/createProjectFormFields';

const { Step } = Steps;

const formSteps = [
  {
    fields: Object.keys({}),
    component: CreateMilestonesStep1
  },
  {
    fields: Object.keys(milestonesFormItems),
    component: CreateMilestonesStep2
  },
  {
    fields: Object.keys({}),
    component: CreateMilestonesStep3
  }
];

const formFields = {
  ...{},
  ...milestonesFormItems,
  ...{}
};

const CreateMilestonesFormContainer = ({ goBack, submitForm }) => {
  const [
    fields,
    setFields,
    steps,
    setNextStep,
    currentStep,
    handleChange,
    getNextStepButton,
    getPrevStepButton
  ] = useMultiStepForm(
    formFields,
    formSteps,
    0,
    values => onSubmit(values),
    true,
    goBack
  );

  const downloadTemplate = async () => {
    try {
      // FIXME: fix this endpoint and api call
      await downloadMilestonesTemplate();
    } catch (error) {
      message.error('There was an error retrieving the template');
    }
  };

  const processMilestones = () => {
    // TODO: MAKE API CALL
  };

  const onSubmit = values => {
    const formData = {};
    Object.keys(values).forEach(key => {
      formData[key] = values[key].value;
    });
    submitForm(PROJECT_FORM_NAMES.MILESTONES, formData);
    // TODO : MAKE API CALL
    // IF SUBMITTED OK GO BACK
    goBack();
  };

  function getStepComponent(current) {
    const Component = steps[current].component;
    return (
      <Component
        fields={fields}
        setFields={setFields}
        setNextStep={setNextStep}
        handleChange={handleChange}
        handleDownload={downloadTemplate}
        handleProcessMilestones={processMilestones}
      />
    );
  }

  return (
    <Fragment>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{getStepComponent(currentStep)}</div>
      <FooterButtons
        nextStepButton={getNextStepButton(currentStep)}
        prevStepButton={getPrevStepButton(currentStep)}
      />
    </Fragment>
  );
};

CreateMilestonesFormContainer.propTypes = {
  goBack: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default CreateMilestonesFormContainer;
