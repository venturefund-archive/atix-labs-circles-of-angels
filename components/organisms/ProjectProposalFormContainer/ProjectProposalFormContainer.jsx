/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import FooterButtons from '../FooterButtons/FooterButtons';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import { proposalFromItems } from '../../../helpers/createProjectFormFields';
import './_style.scss';
import ProjectProposalForm from '../../molecules/ProjectProposalForm/ProjectProposalForm';

const formSteps = [
  {
    fields: Object.keys(proposalFromItems)
  }
];

const formFields = {
  ...proposalFromItems
};

// TODO: load project proposal saved as draft
const ProjectProposalFormContainer = ({ goBack, submitForm }) => {
  const [
    fields,
    ,
    ,
    ,
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

  const onSubmit = values => {
    const formData = {};
    Object.keys(values).forEach(key => {
      formData[key] = values[key].value;
    });
    submitForm(PROJECT_FORM_NAMES.PROPOSAL, formData);
    // TODO : MAKE API CALL
    // IF SUBMITTED OK GO BACK
    goBack();
  };

  return (
    <Fragment>
      <TitlePage textTitle="Complete Project's Proposal" />
      <ProjectProposalForm fields={fields} handleChange={handleChange} />
      <FooterButtons
        nextStepButton={getNextStepButton(currentStep)}
        prevStepButton={getPrevStepButton(currentStep)}
      />
    </Fragment>
  );
};

ProjectProposalFormContainer.propTypes = {
  goBack: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default ProjectProposalFormContainer;
