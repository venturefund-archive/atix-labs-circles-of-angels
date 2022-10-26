/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

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

StepsIf.propTypes = {
  stepNumber: PropTypes.number.isRequired
};
