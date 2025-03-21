/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Steps, message, Spin } from 'antd';
import './_steps-milestones.scss';
import '../../../pages/_style.scss';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import FooterButtons from '../FooterButtons/FooterButtons';
import CreateMilestonesStep1 from './Steps/CreateMilestonesStep1';
import CreateMilestonesStep2 from './Steps/CreateMilestonesStep2';
import CreateMilestonesStep3 from './Steps/CreateMilestonesStep3';
import {
  downloadMilestonesTemplate,
  processProjectMilestones,
  getProjectMilestones
} from '../../../api/projectApi';
import {
  createMilestone,
  updateMilestone,
  deleteMilestone
} from '../../../api/milestonesApi';
import { milestonesFormItems } from '../../../helpers/createProjectFormFields';
import { createTask, updateTask, deleteTask } from '../../../api/activityApi';

const { Step } = Steps;

const formSteps = [
  {
    fields: Object.keys({}),
    component: CreateMilestonesStep1
  },
  {
    fields: Object.keys(milestonesFormItems),
    component: CreateMilestonesStep2
  },
  {
    fields: Object.keys({}),
    component: CreateMilestonesStep3
  }
];

const formFields = {
  ...{},
  ...milestonesFormItems,
  ...{}
};

const CreateMilestonesFormContainer = ({
  project,
  goBack,
  onSuccess,
  onError
}) => {
  const [
    fields,
    setFields,
    steps,
    setNextStep,
    currentStep,
    setCurrentStep,
    handleChange,
    getNextStepButton,
    getPrevStepButton,
    validateFields
  ] = useMultiStepForm(
    formFields,
    formSteps,
    0,
    values => {
      const response = Object.assign({}, values, { projectId: project.id });
      onSuccess(response);
    },
    true,
    goBack
  );

  const [errorList, setErrorList] = useState([]);
  const [processed, setProcessed] = useState(false);
  const [processError, setProcessError] = useState();
  const [milestones, setMilestones] = useState([]);
  const [cleanFile, setCleanFile] = useState(false);
  const [isEditingMilestone, setIsEditingMilestone] = useState(false);
  const [milestoneEditHistory, setMilestoneEditHistory] = useState([]);
  const [fetchingMilestones, setFetchingMilestones] = useState(false);

  const setMilestoneBeingEdited = isBeingEdited => {
    if (isBeingEdited) {
      setMilestoneEditHistory([...milestoneEditHistory, isBeingEdited]);
    } else {
      const history = [...milestoneEditHistory];
      history.pop();
      setMilestoneEditHistory(history);
    }
  };

  useEffect(() => {
    if (milestoneEditHistory.length === 0) {
      setIsEditingMilestone(false);
    } else {
      setIsEditingMilestone(true);
    }
  }, [milestoneEditHistory]);

  useEffect(() => {
    if (!project || !project.id) goBack();
    fetchMilestones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, goBack]);

  useEffect(() => {
    const theresMilestones = milestones.length > 0;
    if (theresMilestones) {
      validateFields(2);
    }
    if (theresMilestones && currentStep === 0) {
      setCurrentStep(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [milestones]);

  const fetchMilestones = useCallback(async () => {
    setFetchingMilestones(true);
    const response = await getProjectMilestones(project.id);
    if (response.errors) {
      message.error("An error occurred while getting the project's milestones");
      return;
    }
    setMilestones(response.data);
    setFetchingMilestones(false);
  }, [project.id]);

  const downloadTemplate = async () => {
    const response = await downloadMilestonesTemplate();
    if (response.errors) return message.error(response.errors);
  };

  const handleResponse = (response, messages) => {
    const { success, error } = messages || {};
    if (response.errors) {
      onError(error);
      return false;
    }
    if (success) message.success(success);
    fetchMilestones();
    return true;
  };

  const handleCreateMilestone = async milestoneData => {
    const response = await createMilestone(project.id, milestoneData);
    return handleResponse(response, {
      success: 'Milestone was successfully created!',
      error: 'There was an error creating the milestone'
    });
  };
  const handleEditMilestone = async (milestoneId, milestone) => {
    const response = await updateMilestone(milestoneId, milestone);
    return handleResponse(response, {
      error: 'There was an error editing the milestone'
    });
  };
  const handleDeleteMilestone = async milestoneId => {
    const response = await deleteMilestone(milestoneId);
    return handleResponse(response, {
      error: 'There was an error deleting the milestone'
    });
  };

  const handleCreateTask = async (milestoneId, taskData) => {
    const response = await createTask(milestoneId, taskData);
    return handleResponse(response, {
      success: 'Task was successfully created!',
      error: 'There was an error creating the task'
    });
  };
  const handleEditTask = async (taskId, task) => {
    const response = await updateTask(taskId, task);
    return handleResponse(response, {
      error: 'There was an error editing the task'
    });
  };
  const handleDeleteTask = async taskId => {
    const response = await deleteTask(taskId);
    return handleResponse(response, {
      error: 'There was an error deleting the task'
    });
  };

  const deleteAllMilestones = () => {
    milestones.forEach(milestone => deleteMilestone(milestone.id));
  };

  const processMilestones = async (fieldName, milestoneFile) => {
    if (!project || !project.id) goBack();
    if (!milestoneFile.length) return;

    const data = new FormData();
    milestoneFile.forEach(file => {
      data.append(fieldName, file);
    });

    setProcessed(false);
    setErrorList([]);
    const response = await processProjectMilestones(project.id, data);

    if (response.errors) {
      onError();
      setProcessError(response.errors);
      return;
    }

    setProcessed(true);

    if (response.data.projectId) {
      message.success('Milestones saved successfully');
      fetchMilestones();
      setCleanFile(true);
      return true;
    }

    if (response.data.errors) setErrorList(response.data.errors);
  };

  const skipProcessFileStep = () => setCurrentStep(2);

  function getStepComponent(current) {
    const Component = steps[current].component;
    return (
      <Component
        fields={fields}
        setFields={setFields}
        setNextStep={setNextStep}
        handleChange={handleChange}
        handleDownload={downloadTemplate}
        handleProcessMilestones={processMilestones}
        errorList={errorList}
        processed={processed}
        processError={processError}
        milestones={milestones}
        createMilestone={handleCreateMilestone}
        editMilestone={handleEditMilestone}
        deleteMilestone={handleDeleteMilestone}
        deleteAllMilestones={deleteAllMilestones}
        createTask={handleCreateTask}
        editTask={handleEditTask}
        deleteTask={handleDeleteTask}
        isEditingMilestone={setMilestoneBeingEdited}
        skipStep={skipProcessFileStep}
        cleanFile={cleanFile}
      />
    );
  }

  const loadingOrSteps = () => {
    if (fetchingMilestones) {
      return <Spin />;
    }
    return (
      <>
        <div className="StepsMilestonesWrapper">
          <Steps current={currentStep}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{getStepComponent(currentStep)}</div>
          <FooterButtons
            nextStepButton={getNextStepButton(
              currentStep,
              currentStep === 1 ? milestones.length === 0 : isEditingMilestone
            )}
            prevStepButton={getPrevStepButton(currentStep)}
          />
        </div>
      </>
    );
  };

  return loadingOrSteps();
};

CreateMilestonesFormContainer.defaultProps = {
  project: undefined
};

CreateMilestonesFormContainer.propTypes = {
  goBack: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    milestonePath: PropTypes.string
  }),
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default CreateMilestonesFormContainer;
