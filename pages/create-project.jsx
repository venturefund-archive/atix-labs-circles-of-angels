/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { message } from 'antd';
import './_createprojectsteps.scss';
import './_style.scss';
import Thumbnails from '../components/organisms/Thumbnails/Thumbnails';
import ProjectDetailFormContainer from '../components/organisms/ProjectDetailFormContainer/ProjectDetailFormContainer';
import ProjectProposalFormContainer from '../components/organisms/ProjectProposalFormContainer/ProjectProposalFormContainer';
import CreateMilestonesFormContainer from '../components/organisms/CreateMilestonesFormContainer/CreateMilestonesFormContainer';
import CreateProject from '../components/organisms/CreateProject/CreateProject';
import useFormSubmitEffect from '../hooks/useFormSubmitEffect';
import { PROJECT_FORM_NAMES } from '../constants/constants';
import { getProject } from '../api/projectApi';
import api from '../api/api';

const wizards = {
  main: CreateProject,
  thumbnails: Thumbnails,
  details: ProjectDetailFormContainer,
  proposal: ProjectProposalFormContainer,
  milestones: CreateMilestonesFormContainer
};

const getApiCall = submittingForm => {
  // TODO send data to endpoint
  const apiCall = () => new Promise(resolve => resolve('OK'));
  switch (submittingForm) {
    case PROJECT_FORM_NAMES.THUMBNAILS:
      return apiCall;
    case PROJECT_FORM_NAMES.DETAILS:
      return apiCall;
    case PROJECT_FORM_NAMES.MILESTONES:
      return apiCall;
    case PROJECT_FORM_NAMES.PROPOSAL:
      return apiCall;
    default:
      return apiCall;
  }
};

const CreateProjectContainer = () => {
  const [currentWizard, setCurrentWizard] = useState(PROJECT_FORM_NAMES.MAIN);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [formValues, setFormValues] = useState({});

  // TODO add logic to show progress on main page
  const successCallback = res => {
    setIsSubmitting(false);
    setCurrentWizard(PROJECT_FORM_NAMES.MAIN);
    return message.success('Saved successfully');
  };

  // TODO validate with UX team
  const errorCallback = err => {
    setIsSubmitting(false);
    message.error('An error ocurred while creating your account');
    return console.error('Error', err);
  };

  const updateFormValues = (values, formKey) => {
    const newFormValeus = {};
    newFormValeus[formKey] = values;
    setFormValues(Object.assign(formValues, newFormValeus));
  };

  const submitForm = (formKey, values) => {
    setIsSubmitting(true);
    setSubmittingForm(formKey);
    updateFormValues(values, formKey);
  };

  // useFormSubmitEffect({
  //   apiCall: getApiCall(submittingForm),
  //   successCallback,
  //   errorCallback,
  //   params: { isSubmitting, formValues: formValues[submittingForm] }
  // });

  const CurrentComponent = wizards[currentWizard];

  // if (currentWizard === PROJECT_FORM_NAMES.DETAILS)
  //   props.thumbnailsData = formValues[PROJECT_FORM_NAMES.THUMBNAILS];

  // if (currentWizard === PROJECT_FORM_NAMES.THUMBNAILS)
  //   props.updateFormValues = updateFormValues;

  // TODO add loading when "isSubmitting"
  return (
    <div className="Content">
      <CurrentComponent
        project={project}
        setCurrentWizard={setCurrentWizard}
        goBack={() => setCurrentWizard(PROJECT_FORM_NAMES.MAIN)}
        submitForm={submitForm}
        {...props}
      />
    </div>
  );
};
export default CreateProjectContainer;
