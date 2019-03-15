import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const Step = Steps.Step;

const StepsProject = () => (
  <div className="StepsContainerProjects">
    <Steps current={0}>
      <Step title="Project Detail" />
      <Step title="Project Milestones" />
      <Step title="Almost Ready" />
    </Steps>
  </div>

);

export default StepsProject;

