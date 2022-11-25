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
import { AssignProjectUsers } from 'components/organisms/AssignProjectUsers/AssignProjectUsers';
import { FormProjectDetail } from 'components/molecules/FormProjectDetail/FormProjectDetail';
import { FormProjectBasicInformation } from 'components/molecules/FormProjectBasicInformation/FormProjectBasicInformation';
import {
  checkProjectHasAllUsersRoles,
  checkProjectHasAllUsersWithFirstLogin,
  getProjectUsersPerRol
} from 'helpers/modules/projectUsers';
import CreateMilestonesFormContainer from '../components/organisms/CreateMilestonesFormContainer/CreateMilestonesFormContainer';
import CreateProject from '../components/organisms/CreateProject/CreateProject';
import { PROJECT_FORM_NAMES } from '../constants/constants';
import { getProject, sendToReview, deleteProject } from '../api/projectApi';
import { showModalConfirm } from '../components/utils/Modals';

const wizards = {
  main: CreateProject,
  thumbnails: FormProjectBasicInformation,
  details: FormProjectDetail,
  proposal: AssignProjectUsers,
  milestones: CreateMilestonesFormContainer
};

const CreateProjectContainer = () => {
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

  const id = history.location.pathname.split('/').pop();

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
    const { details, basicInformation, users } = projectToCheck;

    const { beneficiaries = [], investors = [], auditors = [] } = getProjectUsersPerRol(users);

    const projectHasAllUsersRoles = checkProjectHasAllUsersRoles({
      beneficiaries,
      investors,
      auditors
    });

    const projectHasAllUsersWithFirstLogin = checkProjectHasAllUsersWithFirstLogin({
      beneficiaries,
      investors,
      auditors
    });

    const stepsStatus = {
      thumbnails: basicInformation?.location,
      details:
        details?.mission && details?.problemAddressed && details?.currency && details?.currencyType,
      proposal: projectHasAllUsersRoles && projectHasAllUsersWithFirstLogin,
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

  const sendProjectToReview = async () => sendToReview(project.id);

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

  if (currentWizard === PROJECT_FORM_NAMES.MAIN) props.completedSteps = completedSteps;

  const handleGoBack = async ({ withUpdate } = { withUpdate: false }) => {
    if (withUpdate) await fetchProject(project.id);
    setCurrentWizard(PROJECT_FORM_NAMES.MAIN);
  };

  // TODO add loading when "isSubmitting"
  return (
    <CurrentComponent
      project={project}
      setCurrentWizard={setCurrentWizard}
      goBack={handleGoBack}
      onError={errorCallback}
      onSuccess={successCallback}
      submitForm={submitForm}
      goToMyProjects={goToMyProjects}
      sendToReview={sendProjectToReview}
      deleteProject={askDeleteConfirmation}
      {...props}
    />
  );
};
export default CreateProjectContainer;
