import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const Step = Steps.Step;

const StepsIf = () => (
  <div className="StepsContainer">
    <Steps size="small" current={0}>
      <Step />
      <Step />
      <Step />
    </Steps>
  </div>

);

export default StepsIf;

