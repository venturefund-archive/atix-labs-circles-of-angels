import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const { Step } = Steps;

const StepsIf = ({ stepNumber }) => (
  <div className="StepsContainer">
    <Steps progressDot size="small" current={stepNumber}>
      <Step title="Consensus" />
      <Step title="Signatories" />
      <Step title="Funding" />
    </Steps>
  </div>
);

export default StepsIf;
