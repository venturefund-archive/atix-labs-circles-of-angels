/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

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
