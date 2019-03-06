import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const Step = Steps.Step;

const StepsSe = () => (
  <div className="StepsContainer">
    <Steps current={1}>
      <Step title="Consensus" />
      <Step title="Signatories" />
    </Steps>
  </div>

);

export default StepsSe;

