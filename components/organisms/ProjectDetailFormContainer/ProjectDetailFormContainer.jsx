/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import FooterButtons from '../FooterButtons/FooterButtons';
import { detailsFormInputs } from '../../../helpers/createProjectFormFields';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import './_style.scss';
import ProjectDetailForm from '../../molecules/ProjectDetailForm/ProjectDetailForm';

const formSteps = [
  {
    fields: Object.keys(detailsFormInputs)
  }
];

const formFields = {
  ...detailsFormInputs
};

const ProjectDetailFormContainer = ({
  submitForm,
  thumbnailsData,
  project,
  goBack
}) => {
  // why multistep form instead of the simple one?
  const [
    fields,
    setFields,
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

  // TODO: load project and get photo if in draft
  useEffect(() => {
    if (!project || !project.id) return;

    fields.mission.value = project.mission || '';
    fields.problemAddressed.value = project.problemAddressed || '';
    fields.coverPhotoPath.value = project.coverPhotoPath || '';

    setFields({
      ...fields
    });
  }, [fields, setFields, project]);

  const onSubmit = values => {
    const formData = {};
    Object.keys(values).forEach(key => {
      formData[key] = values[key].value;
    });
    submitForm(PROJECT_FORM_NAMES.DETAILS, formData);
    // TODO : MAKE API CALL
    // IF SUBMITTED OK GO BACK
    goBack();
  };

  return (
    <Fragment>
      <TitlePage textTitle="Complete Project´s Details" />
      <ProjectDetailForm
        thumbnailsData={thumbnailsData}
        handleChange={handleChange}
        fields={fields}
      />
      <FooterButtons
        nextStepButton={getNextStepButton(currentStep)}
        prevStepButton={getPrevStepButton(currentStep)}
      />
    </Fragment>
  );
};

ProjectDetailFormContainer.defaultProps = {
  thumbnailsData: {
    location: '',
    goalAmount: '',
    timeframe: '',
    projectName: ''
  },
  project: undefined
};

ProjectDetailFormContainer.propTypes = {
  thumbnailsData: PropTypes.shape({
    location: PropTypes.string,
    goalAmount: PropTypes.string,
    timeframe: PropTypes.string,
    projectName: PropTypes.string
  }),
  submitForm: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    mission: PropTypes.string,
    problemAddressed: PropTypes.string,
    coverPhotoPath: PropTypes.string
  }),
  goBack: PropTypes.func.isRequired
};

export default ProjectDetailFormContainer;
