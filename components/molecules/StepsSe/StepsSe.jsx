import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const { Step } = Steps;

const StepsSe = () => (
  <div className="StepsContainer">
    <Steps current={0}>
      <Step />
      <Step />
    </Steps>
  </div>

);

export default StepsSe;

