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

const DownloadAgreement = ({ subtitle, text, click }) => (
  <div className="DownloadAgreementContainer">
    <div className="AgreementText">
      <h2>{subtitle}</h2>
      <p>{text}</p>
    </div>
    <Button onClick={click}>
      Download Project Agreement File <Icon type="download" />
    </Button>
  </div>
);

export default DownloadAgreement;
