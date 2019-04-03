import React from 'react';
import { Button, Icon } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const DownloadTemplate = ({ subtitle, text, click }) => (
  <div className="DownloadTemplateContainer">
    <div className="TemplateText">
      <p className="Title">{subtitle}</p>
      <p>{text}</p>
    </div>
    <CustomButton
      theme="Download"
      buttonText="Download Excel File"
      onClick={click}
      icon="download"
    />
  </div>
);

export default DownloadTemplate;
