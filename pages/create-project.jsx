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
        goalAmount: data.goalAmount,
        cardPhotoPath: data.cardPhotoPath,
        location: data.location
      };

      submitForm(PROJECT_FORM_NAMES.THUMBNAILS, thumbnailsData);
      setProject(data);
      checkStepsStatus(data);
    },
    [history]
  );

  const checkStepsStatus = projectToCheck => {
    const { projectName, mission, proposal, milestonePath } = projectToCheck;

    const stepsStatus = {
      thumbnails: !!projectName,
      details: !!mission,
      proposal: !!proposal,
      milestones: !!milestonePath
    };

    setCompletedSteps(stepsStatus);
  };

  const submitForm = (formKey, values) => updateFormValues(values, formKey);

  const updateFormValues = (values, formKey) => {
    const newFormValues = { ...formValues };
    newFormValues[formKey] = values;
    setFormValues(newFormValues);
  };

  const successCallback = (res, successMsg) => {
    setCurrentWizard(PROJECT_FORM_NAMES.MAIN);
    fetchProject(res.projectId);
    message.success(successMsg || 'Saved successfully');
    return res;
  };

  // TODO validate with UX team
  const errorCallback = errorMsg =>
    message.error(errorMsg || 'An error ocurred while saving the information');

  const sendProjectToReview = async () => {
    const response = await sendToReview(id);
    if (response.errors) {
      message.error(response.errors);
      return;
    }
    message.success('Your project was successfully sent to review!');
    goToMyProjects(); // or to project detail?
  };

  const goToMyProjects = () => history.push('/my-projects');

  useEffect(() => {
    if (id) fetchProject(id);
  }, [id, fetchProject]);

  const CurrentComponent = wizards[currentWizard];
  const props = {};

  if (currentWizard === PROJECT_FORM_NAMES.DETAILS)
    props.thumbnailsData = formValues[PROJECT_FORM_NAMES.THUMBNAILS];

  if (currentWizard === PROJECT_FORM_NAMES.MAIN)
    props.completedSteps = completedSteps;

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
