/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import SecurityKey from '../../atoms/SecurityKey/SecurityKey';
import './_style.scss';

const SecurityKeySection = ({ words }) => (
  <div className="SecurityKeySection">
    {words.map(word => (
      <SecurityKey word={word} />
    ))}
  </div>
);

export default SecurityKeySection;
