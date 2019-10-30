/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Steps, message } from 'antd';
import Step1 from '../../molecules/Steps/step-1';
import Step2 from '../../molecules/Steps/step-2';
import Step3 from '../../molecules/Steps/step-3';
import FileUploadStatus from '../../../constants/FileUploadStatus';

import './_create-project.scss';

const { Step } = Steps;

const changeProjectFile = (project, key, file) => {
  const { status } = file;
  console.log('status', status);
  if (status === FileUploadStatus.DONE) {
    message.success(`${file.name} file uploaded successfully`);
    project.files[key] = file;
  } else if (status === FileUploadStatus.ERROR) {
    message.error(`${file.name} file upload failed.`);
  } else if (status === FileUploadStatus.REMOVED) {
    project.files[key] = {};
  }
};

const hideButton = ({ hiddenButtons, setHiddenButtons }) => button => {
  hiddenButtons[button] = true;
  setHiddenButtons(hiddenButtons);
};

const showButton = ({ hiddenButtons, setHiddenButtons }) => button => {
  hiddenButtons[button] = false;
  setHiddenButtons(hiddenButtons);
};

const next = ({ current, setCurrent }) => () => setCurrent(current + 1);

const prev = ({ current, setCurrent }) => () => setCurrent(current - 1);

const steps = ({
  project,
  current,
  hiddenButtons,
  setCurrent,
  setHiddenButtons
}) => [
  {
    title: 'Project Details',
    content: (
      <Step1
        project={project}
        next={next({ current, setCurrent })}
        changeProjectFile={changeProjectFile}
        hiddenButtons={hiddenButtons}
        showButton={showButton({ hiddenButtons, setHiddenButtons })}
        hideButton={hideButton({ hiddenButtons, setHiddenButtons })}
      />
    )
  },
  {
    title: 'Project Milestones',
    content: (
      <Step2
        project={project}
        next={next({ current, setCurrent })}
        prev={prev({ current, setCurrent })}
        changeProjectFile={changeProjectFile}
      />
    )
  },
  {
    title: 'Project Completed',
    content: <Step3 />
  }
];

const CreateProjectSteps = ({ project }) => {
  const [current, setCurrent] = useState(0);
  const [hiddenButtons, setHiddenButtons] = useState({
    projectProposal: false,
    projectCardPhoto: false,
    projectCoverPhoto: false,
    projectAgreement: false
  });
  const currentStep = steps({
    project,
    current,
    setCurrent,
    hiddenButtons,
    setHiddenButtons
  });
  return (
    <div className="CreateProjectContainer">
      <div className="StepsContainer">
        <Steps size="small" current={current}>
          {currentStep.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>
      {currentStep[current].content}
    </div>
  );
};

export default CreateProjectSteps;
