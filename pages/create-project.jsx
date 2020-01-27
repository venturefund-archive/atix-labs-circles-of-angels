/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router';
import './_createprojectsteps.scss';
import './_style.scss';
import Thumbnails from '../components/organisms/Thumbnails/Thumbnails';
import ProjectDetailFormContainer from '../components/organisms/ProjectDetailFormContainer/ProjectDetailFormContainer';
import ProjectProposalFormContainer from '../components/organisms/ProjectProposalFormContainer/ProjectProposalFormContainer';
import CreateMilestonesFormContainer from '../components/organisms/CreateMilestonesFormContainer/CreateMilestonesFormContainer';
import CreateProject from '../components/organisms/CreateProject/CreateProject';
import { PROJECT_FORM_NAMES } from '../constants/constants';
import { getProject, sendToReview } from '../api/projectApi';
import useQuery from '../hooks/useQuery';

const wizards = {
  main: CreateProject,
  thumbnails: Thumbnails,
  details: ProjectDetailFormContainer,
  proposal: ProjectProposalFormContainer,
  milestones: CreateMilestonesFormContainer
};

const CreateProjectContainer = () => {
  const { id } = useQuery();
  const history = useHistory();
  const [currentWizard, setCurrentWizard] = useState(PROJECT_FORM_NAMES.MAIN);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [project, setProject] = useState();

  const goToMyProjects = () => history.push('/my-projects');

  const sendProjectToReview = async () => {
    const response = await sendToReview(id);
    if (response.errors) {
      message.error(response.errors);
      return;
    }
    message.success('Your project was successfully sent to review!');
    goToMyProjects(); // or to project detail?
  };

  const fetchProject = useCallback(
    async projectId => {
      const response = await getProject(projectId);
      if (response.errors || !response.data) {
        message.error('An error occurred while fetching the project');
        goToMyProjects();
        return;
      }
      setProject(response.data);
      const thumbnailsData = {
        projectName: response.data.projectName,
        timeframe: response.data.timeframe,
        goalAmount: response.data.goalAmount,
        cardPhotoPath: response.data.cardPhotoPath,
        location: response.data.location
      };
      submitForm(PROJECT_FORM_NAMES.THUMBNAILS, thumbnailsData);
    },
    [history]
  );

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id, fetchProject]);

  // TODO add logic to show progress on main page
  const successCallback = (res, successMsg) => {
    setIsSubmitting(false);
    setCurrentWizard(PROJECT_FORM_NAMES.MAIN);
    fetchProject(res.projectId);
    message.success(successMsg || 'Saved successfully');
    return res;
  };

  // TODO validate with UX team
  const errorCallback = errorMsg => {
    setIsSubmitting(false);
    message.error(errorMsg || 'An error ocurred while saving the information');
  };

  const updateFormValues = (values, formKey) => {
    const newFormValues = { ...formValues };
    newFormValues[formKey] = values;
    setFormValues(newFormValues);
  };

  const submitForm = (formKey, values) => {
    setIsSubmitting(true);
    setSubmittingForm(formKey);
    updateFormValues(values, formKey);
  };

  const CurrentComponent = wizards[currentWizard];
  const props = {};

  if (currentWizard === PROJECT_FORM_NAMES.DETAILS)
    props.thumbnailsData = formValues[PROJECT_FORM_NAMES.THUMBNAILS];

  // TODO add loading when "isSubmitting"
  return (
    <div className="CreateProjectWrapper">
      <div className="Content">
        <CurrentComponent
          project={project}
          setCurrentWizard={setCurrentWizard}
          goBack={() => setCurrentWizard(PROJECT_FORM_NAMES.MAIN)}
          onError={errorCallback}
          onSuccess={successCallback}
          submitForm={submitForm}
          goToMyProjects={goToMyProjects}
          sendToReview={sendProjectToReview}
          {...props}
        />
      </div>
    </div>
  );
};
export default CreateProjectContainer;
