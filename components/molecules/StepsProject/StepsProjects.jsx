/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const { Step } = Steps;

const StepsProject = ({ stepNumber }) => (
  <div className="StepsContainerProjects">
    <Steps progressDot size="small" current={stepNumber}>
      <Step title="Project Details" />
      <Step title="Project Milestones" />
      <Step title="Almost Ready" />
    </Steps>
  </div>
);

export default StepsProject;
