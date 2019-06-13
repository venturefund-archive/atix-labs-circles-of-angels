/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Button, Icon } from 'antd';
import './_style.scss';

const DownloadTemplate = ({ subtitle, text, click , buttontext }) => (
  <div className="DownloadTemplateContainer">
    <div className="vertical">
        {subtitle && <p className="Title">{subtitle}</p>}
        <p>{text}</p>
      </div>
    <Button onClick={click}>
      {buttontext} <Icon type="download" />
    </Button>
  </div>
);

export default DownloadTemplate;
