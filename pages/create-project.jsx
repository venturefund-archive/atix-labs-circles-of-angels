/* eslint-disable react-hooks/exhaustive-deps */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router';
import './_createproject.scss';
import './_style.scss';
import { FormProjectUsers } from 'components/organisms/AssignProjectUsers/AssignProjectUsers';
import { FormProjectDetail } from 'components/molecules/FormProjectDetail/FormProjectDetail';
import { FormProjectBasicInformation } from 'components/molecules/FormProjectBasicInformation/FormProjectBasicInformation';
import ProjectProposalFormContainer from '../components/organisms/ProjectProposalFormContainer/ProjectProposalFormContainer';
import CreateMilestonesFormContainer from '../components/organisms/CreateMilestonesFormContainer/CreateMilestonesFormContainer';
import CreateProject from '../components/organisms/CreateProject/CreateProject';
import { PROJECT_FORM_NAMES } from '../constants/constants';
import { getProject, sendToReview, deleteProject } from '../api/projectApi';
import { showModalConfirm } from '../components/utils/Modals';

const wizards = {
  main: CreateProject,
  thumbnails: FormProjectBasicInformation,
  details: FormProjectDetail,
  proposal: FormProjectUsers,
  milestones: CreateMilestonesFormContainer
};

const getIdFromPath = () => {
  const pathParts = window.location.pathname.split('/');
  return pathParts[pathParts.length - 1];
};

const CreateProjectContainer = () => {
  const id = getIdFromPath();
  const history = useHistory();
  const [currentWizard, setCurrentWizard] = useState(PROJECT_FORM_NAMES.MAIN);
  const [formValues, setFormValues] = useState({});
  const [project, setProject] = useState();
  const [completedSteps, setCompletedSteps] = useState({
    thumbnails: false,
    details: false,
    proposal: false,
    milestones: false
  });

  const fetchProject = useCallback(
    async projectId => {
      const response = await getProject(projectId);
      if (response.errors || !response.data) {
        message.error('An error occurred while fetching the project');
        goToMyProjects();
        return;
      }
      const { data } = response;
      const thumbnailsData = {
        projectName: data.projectName,
        timeframe: data.timeframe,
        timeframeUnit: 'months',
        goalAmount: data.goalAmount,
        cardPhotoPath: data.cardPhotoPath,
        location: data.location
      };

      submitForm(PROJECT_FORM_NAMES.THUMBNAILS, thumbnailsData);
      setProject({ ...data, id });
      await checkStepsStatus(data);
    },
    [history]
  );

  const checkStepsStatus = async projectToCheck => {
    const { details, proposal, basicInformation } = projectToCheck;

    const stepsStatus = {
      thumbnails: basicInformation?.location,
      details:
        details?.mission && details?.problemAddressed && details?.currency && details?.currencyType,
      proposal: !!proposal,
      milestones: false
    };

    setCompletedSteps(stepsStatus);
  };

  const submitForm = useCallback((formKey, values) => updateFormValues(values, formKey));

  const updateFormValues = (values, formKey) => {
    const newFormValues = { ...formValues };
    newFormValues[formKey] = values;
    setFormValues(newFormValues);
  };

  const successCallback = async (res, successMsg) => {
    setCurrentWizard(PROJECT_FORM_NAMES.MAIN);
    await fetchProject(res.projectId);
    message.success(successMsg || 'Saved successfully');
    return res;
  };

  // TODO validate with UX team
  const errorCallback = errorMsg =>
    message.error(errorMsg || 'An error ocurred while saving the information');

  const sendProjectToReview = async () => {
    if (project && project.id) {
      const response = await sendToReview(project.id);
      if (response.errors) {
        message.error(response.errors);
        return;
      }
      message.success('Your project was successfully sent to review!');
      goToMyProjects(); // or to project detail?
    }
  };

  const askDeleteConfirmation = () => {
    if (project && project.id) {
      showModalConfirm(
        'Warning!',
        'Are you sure you want to delete your project?',
        deleteCurrentProject
      );
    }
  };

  const deleteCurrentProject = async () => {
    if (project && project.id) {
      const response = await deleteProject(project.id);
      if (response.errors) {
        message.error(response.errors);
        return;
      }
      message.success('Your project was successfully deleted!');
      goToMyProjects(); // or to project detail?
    }
  };

  const goToMyProjects = () => history.push('/my-projects');

  useEffect(() => {
    if (id) fetchProject(id);
  }, [id, fetchProject]);

  const CurrentComponent = wizards[currentWizard];
  const props = {};

  /* if (currentWizard === PROJECT_FORM_NAMES.DETAILS)
    props.thumbnailsData = formValues[PROJECT_FORM_NAMES.THUMBNAILS]; */

  if (currentWizard === PROJECT_FORM_NAMES.MAIN) props.completedSteps = completedSteps;

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
          deleteProject={askDeleteConfirmation}
          {...props}
        />
      </div>
    </div>
  );
};
export default CreateProjectContainer;
