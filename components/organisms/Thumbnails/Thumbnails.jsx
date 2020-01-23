/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';

import TitlePage from '../../atoms/TitlePage/TitlePage';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import FooterButtons from '../FooterButtons/FooterButtons';
import { thumbnailsFormInputs } from '../../../helpers/createProjectFormFields';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import useForm from '../../../hooks/useForm';
import {
  createProjectThumbnail,
  updateProjectThumbnail
} from '../../../api/projectApi';
import ProjectThumbnailForm from '../../molecules/ProjectThumbnailForm/ProjectThumbnailForm';

const formFields = {
  ...thumbnailsFormInputs
};

const Thumbnails = ({ project, goBack, submitForm, onError, onSuccess }) => {
  const [fields, setFields, handleChange, handleSubmit] = useForm(formFields);

  useEffect(() => {
    if (!project || !project.id) return;

    const projectFields = { ...fields };

    projectFields.projectName.value =
      project.projectName || projectFields.projectName.value;
    projectFields.timeframe.value =
      project.timeframe || projectFields.timeframe.value;
    projectFields.goalAmount.value =
      project.goalAmount || projectFields.goalAmount.value;
    projectFields.cardPhotoPath.value =
      project.cardPhotoPath || projectFields.cardPhotoPath.value;
    projectFields.location.value =
      project.location || projectFields.location.value;

    setFields({
      ...projectFields
    });
  }, [project, setFields]);

  const onSubmit = async data => {
    const formData = {};
    data.forEach((value, key) => {
      if (key !== thumbnailsFormInputs.cardPhotoPath.name)
        formData[key] = value;
    });
    submitForm(PROJECT_FORM_NAMES.THUMBNAILS, formData);
    try {
      if (project && project.id) {
        const response = await updateProjectThumbnail(project.id, data);
        if (response.errors) {
          return onError();
        }
        return onSuccess(response.data);
      }
      const response = await createProjectThumbnail(data);
      if (response.errors) {
        return onError();
      }
      return onSuccess(response.data);
    } catch (error) {
      message.error('An error occurred when trying to save the information');
    }
  };

  const getNextStepButton = () => (
    <CustomButton
      theme="Primary"
      buttonText="Save & Continue"
      onClick={async () => {
        const submitted = await handleSubmit(onSubmit);
        if (submitted) goBack();
      }}
    />
  );

  const getPrevStepButton = () => (
    <CustomButton theme="Secondary" buttonText="Back" onClick={goBack} />
  );

  return (
    <Fragment>
      <div className="ThumbnailsWrapper">
      <TitlePage textTitle="Complete Project's Thumbnail" />
      <ProjectThumbnailForm fields={fields} handleChange={handleChange} />
      <FooterButtons
        nextStepButton={getNextStepButton()}
        prevStepButton={getPrevStepButton()}
      />
      </div>
    </Fragment>
  );
};

Thumbnails.defaultProps = {
  project: undefined
};

Thumbnails.propTypes = {
  submitForm: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    projectName: PropTypes.string,
    timeframe: PropTypes.string,
    goalAmount: PropTypes.number,
    cardPhotoPath: PropTypes.string,
    location: PropTypes.string
  }),
  goBack: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default Thumbnails;
