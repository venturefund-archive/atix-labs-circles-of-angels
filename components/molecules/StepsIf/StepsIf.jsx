import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const Step = Steps.Step;

const StepsIf = () => (
  <div className="StepsContainer">
    <Steps current={2}>
      <Step title="Consensus" />
      <Step title="Signatories" />
      <Step title="Transfer Funds" />
    </Steps>
  </div>

);

export default StepsIf;

