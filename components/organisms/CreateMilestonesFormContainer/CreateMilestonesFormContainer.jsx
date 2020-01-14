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
import { createMilestone } from '../../../api/milestonesApi';
import { milestonesFormItems } from '../../../helpers/createProjectFormFields';

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

// TODO: what happens when project has milestones saved?
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

  const handleCreateMilestone = async milestoneData => {
    const response = await createMilestone(project.id, milestoneData);
    if (response.errors) {
      onError();
      return false;
    }
    message.success('Milestone was successfully created');
    fetchMilestones();
    return true;
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
      />
    );
  }

  return (
    <Fragment>
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
