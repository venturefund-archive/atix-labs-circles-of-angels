/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from "react";
import { Button, Icon } from "antd";
import "./_style.scss";

const DownloadFile = ({ subtitle, text, buttonText, click }) => (
  <div className="DownloadFileContainer">
    <div className="FileText">
      <h2>{subtitle}</h2>
      <p>{text}</p>
    </div>
    <Button onClick={click}>
      {buttonText} <Icon type="download" />
    </Button>
  </div>
);

export default DownloadFile;
