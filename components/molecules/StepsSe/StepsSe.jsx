import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const { Step } = Steps;

const StepsSe = ({ stepNumber }) => (
  <div className="StepsContainer">
    <Steps progressDot size="small" current={stepNumber}>
      <Step title="Consensus" />
      <Step title="Signatories" />
    </Steps>
  </div>
);

export default StepsSe;
