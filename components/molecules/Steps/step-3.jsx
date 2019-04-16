import React from 'react';
import { Icon } from 'antd';
import animationData from './success.json';
import './_style.scss';
import LottieFiles from '../LottieFiles';

const Step3 = () => (
  <div className="StepContent">
    <div className="ProjectStep3Container">
      <LottieFiles animationData={animationData} height={140} width={140} />
      <h1>Your Project has been created successfully!</h1>
      <h2>You can access to it from "My Projects"</h2>
    </div>
  </div>
);

export default Step3;
