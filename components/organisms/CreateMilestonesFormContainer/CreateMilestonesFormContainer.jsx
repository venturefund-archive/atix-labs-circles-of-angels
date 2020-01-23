/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Steps, message } from 'antd';
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

const CreateMilestonesFormContainer = ({ project, goBack, onError }) => {
  const [
    fields,
    setFields,
    steps,
    setNextStep,
    currentStep,
    handleChange,
    getNextStepButton,
    getPrevStepButton
  ] = useMultiStepForm(formFields, formSteps, 0, goBack, true, goBack);

  const [errorList, setErrorList] = useState([]);
  const [processed, setProcessed] = useState(false);
  const [processError, setProcessError] = useState();
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    if (!project || !project.id) goBack();
    fetchMilestones();
  }, [project, goBack]);

  useEffect(() => {
    if (milestones.length > 0) {
      setProcessed(true);
    }
  }, [milestones]);

  const fetchMilestones = async () => {
    const response = await getProjectMilestones(project.id);
    if (response.errors) {
      message.error("An error occurred while getting the project's milestones");
      return;
    }
    setMilestones(response.data);
  };

  const downloadTemplate = async () => {
    try {
      // FIXME: fix this endpoint and api call
      await downloadMilestonesTemplate();
    } catch (error) {
      message.error('There was an error retrieving the template');
    }
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

  const processMilestones = async milestoneFile => {
    if (!project || !project.id) goBack();
    if (!milestoneFile || !milestoneFile.file) return;
    const data = new FormData();
    Object.entries(milestoneFile).forEach(([filename, file]) => {
      data.append(filename, file);
    });
    setProcessed(false);
    const response = await processProjectMilestones(project.id, data);
    setProcessed(true);
    if (response.errors) {
      onError();
      setProcessError(response.errors);
      return;
    }
    if (response.data.projectId) {
      message.success('Milestones saved successfully');
      fetchMilestones();
      return true;
    }
    if (response.data.errors) {
      setErrorList(response.data.errors);
    }
  };

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
        createTask={handleCreateTask}
        editTask={handleEditTask}
        deleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <Fragment>
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
            currentStep === 1 ? !processed : false
          )}
          prevStepButton={getPrevStepButton(currentStep)}
        />
      </div>
    </Fragment>
  );
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
  onError: PropTypes.func.isRequired
};

export default CreateMilestonesFormContainer;
