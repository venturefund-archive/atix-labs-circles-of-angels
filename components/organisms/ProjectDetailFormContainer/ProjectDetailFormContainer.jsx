/* eslint-disable react-hooks/exhaustive-deps */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment, useEffect } from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import FooterButtons from '../FooterButtons/FooterButtons';
import { detailsFormInputs } from '../../../helpers/createProjectFormFields';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import ProjectDetailForm from '../../molecules/ProjectDetailForm/ProjectDetailForm';
import { updateProjectDetail } from '../../../api/projectApi';

const formSteps = [
  {
    fields: Object.keys(detailsFormInputs)
  }
];

const formFields = {
  ...detailsFormInputs
};

const ProjectDetailFormContainer = ({
  thumbnailsData,
  project,
  goBack,
  onError,
  onSuccess
}) => {
  // why multistep form instead of the simple one?
  const [
    fields,
    setFields,
    ,
    ,
    currentStep,
    ,
    handleChange,
    getNextStepButton,
    getPrevStepButton,
    validateFields
  ] = useMultiStepForm(
    formFields,
    formSteps,
    0,
    values => onSubmit(values),
    true,
    goBack
  );

  useEffect(() => {
    if (!project || !project.id) return goBack();

    clearFields();
    const projectFields = { ...fields };
    const {
      mission,
      problemAddressed,
      coverPhotoPath,
      agreementFilePath,
      proposalFilePath
    } = project;

    if (
      !mission &&
      !problemAddressed &&
      !coverPhotoPath &&
      !agreementFilePath &&
      !proposalFilePath
    )
      return;

    projectFields.mission.value = mission;
    projectFields.problemAddressed.value = problemAddressed;
    projectFields.coverPhotoPath.value = coverPhotoPath;
    projectFields.agreementFile.value = agreementFilePath;
    projectFields.proposalFile.value = proposalFilePath;

    setFields({ ...projectFields });
    validateFields();
  }, [setFields, project, goBack]);

  const onSubmit = async values => {
    const data = new FormData();
    Object.values(values).forEach(field => {
      if (field.value) {
        if (field.type === 'file' && Array.isArray(field.value)) {
          field.value.forEach(file => data.append(field.name, file));
        } else if (field.type !== 'file') {
          data.set(field.name, field.value);
        }
      }
    });

    const formData = {};
    data.forEach((value, key) => {
      formData[key] = value;
    });
    clearFields();
    try {
      if (project && project.id) {
        const response = await updateProjectDetail(project.id, data);
        if (response.errors) {
          return onError(response.errors);
        }
        onSuccess(response.data);
        goBack();
      }
    } catch (error) {
      message.error('An error occurred when trying to save the information');
    }
  };

  const clearFields = () => {
    Object.keys(fields).forEach(fieldName => {
      fields[fieldName].value = '';
    });
  };

  return (
    <Fragment>
      <div className="DetailWrapper">
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
      </div>
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
  project: PropTypes.shape({
    id: PropTypes.number,
    mission: PropTypes.string,
    problemAddressed: PropTypes.string,
    coverPhotoPath: PropTypes.string
  }),
  goBack: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default ProjectDetailFormContainer;
