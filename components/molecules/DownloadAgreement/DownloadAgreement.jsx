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
