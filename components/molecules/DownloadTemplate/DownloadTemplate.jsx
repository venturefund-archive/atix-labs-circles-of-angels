import React from 'react';
import { Button, Icon } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const DownloadTemplate = ({ subtitle, text, click }) => (
  <div className="DownloadTemplateContainer">
      <p className="Title">{subtitle}</p>
    <Button onClick={click}>
      Download Excel File <Icon type="download" />
    </Button>
  </div>
);

export default DownloadTemplate;
