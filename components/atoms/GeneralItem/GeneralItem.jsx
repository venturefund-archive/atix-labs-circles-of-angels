/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Icon } from 'antd';
import './_style.scss';

const GeneralItem = ({ label, info, img }) => (
  <div className="GeneralItem flex">
    <img src={img} alt="imgItems" />
    <div className="HeaderData vertical">
      <p className="Label">{label}</p>
      <h2 className="Info">{info}</h2>
    </div>
  </div>
);

export default GeneralItem;
