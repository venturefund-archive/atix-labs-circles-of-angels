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
