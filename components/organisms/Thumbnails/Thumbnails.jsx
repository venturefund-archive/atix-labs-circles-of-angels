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
import api from '../../../api/api';
import ProjectThumbnailForm from '../../molecules/ProjectThumbnailForm/ProjectThumbnailForm';

const formFields = {
  ...thumbnailsFormInputs
};

const Thumbnails = ({ project, goBack, submitForm }) => {
  const [fields, setFields, handleChange, handleSubmit] = useForm(formFields);

  // TODO: load project and get photo if in draft
  useEffect(() => {
    if (!project || !project.id) return;

    fields.projectName.value = project.projectName || '';
    fields.timeframe.value = project.timeframe || '';
    fields.goalAmount.value = project.goalAmount || '';
    fields.cardPhotoPath.value = project.cardPhotoPath || '';
    fields.location.value = project.location || '';

    setFields({
      ...fields
    });
  }, [fields, setFields, project]);

  // FIXME : this is wrong on so many levels.
  const onSubmit = async data => {
    const formData = {};
    data.forEach((value, key) => {
      formData[key] = value;
    });
    submitForm(PROJECT_FORM_NAMES.THUMBNAILS, formData);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (project && project.id) {
        const url = `/projects/${project.id}/description`;
        // eslint-disable-next-line no-param-reassign
        data.projectId = project.id;
        return (await api.put(url, data, config)).data;
      }
      const url = '/projects/description';
      return (await api.post(url, data, config)).data;
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
      // disabled={!isFormValid}
    />
  );

  const getPrevStepButton = () => (
    <CustomButton theme="Secondary" buttonText="Back" onClick={goBack} />
  );

  return (
    <Fragment>
      <TitlePage textTitle="Complete Project's Thumbnail" />
      <ProjectThumbnailForm fields={fields} handleChange={handleChange} />
      <FooterButtons
        nextStepButton={getNextStepButton()}
        prevStepButton={getPrevStepButton()}
      />
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
  goBack: PropTypes.func.isRequired
};

export default Thumbnails;
