import React from 'react';
import { Button, Icon } from 'antd';
import './_style.scss';

const DownloadTemplate = ({ subtitle, text, click }) => (
  <div className="DownloadTemplateContainer">
    {subtitle && <p className="Title">{subtitle}</p>}
    <Button onClick={click}>
      {text} <Icon type="download" />
    </Button>
  </div>
);

export default DownloadTemplate;
