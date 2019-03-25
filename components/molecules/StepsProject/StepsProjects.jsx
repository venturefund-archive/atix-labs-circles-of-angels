import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const { Step } = Steps;

const StepsProject = ({ stepNumber }) => (
  <div className="StepsContainerProjects">
    <Steps current={stepNumber}>
      <Step title="Project Detail" />
      <Step title="Project Milestones" />
      <Step title="Almost Ready" />
    </Steps>
  </div>
);

export default StepsProject;
