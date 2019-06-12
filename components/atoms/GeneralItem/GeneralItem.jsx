/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Icon } from 'antd';
import './_style.scss';

const GeneralItem = ({ subtitle, title, iconItem }) => (
  <div className="GeneralItem">
    <div className="HeaderData">
      <Icon type={iconItem} style={{ color: '#8b91a4' }} />
      <p>{subtitle}</p>
    </div>
    <h2>{title}</h2>
  </div>
);

export default GeneralItem;
