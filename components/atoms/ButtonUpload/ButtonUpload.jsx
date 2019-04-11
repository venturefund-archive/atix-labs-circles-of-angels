import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import './_style.scss';
import CustomButton from '../CustomButton/CustomButton';

const ButtonUpload = ({ change, name, typeAccepts, buttonText }) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const props = {
    name,
    customRequest: dummyRequest,
    onChange: change,
    accept: typeAccepts
  };

  return (
    <Upload {...props}>
      <Button>
        Project Proposal <Icon type="upload" />
      </Button>
    </Upload>
  );
};

export default ButtonUpload;
