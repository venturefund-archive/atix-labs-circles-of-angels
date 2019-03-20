import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const Step = Steps.Step;

const StepsSe = () => (
  <div className="StepsContainer">
    <Steps size="small" current={0}>
      <Step />
      <Step />
    </Steps>
  </div>

);

export default StepsSe;

