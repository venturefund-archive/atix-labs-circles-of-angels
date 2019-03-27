import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import './_style.scss';

const ButtonUploadFile = ({ change, name, text, typeAccepts }) => {
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
        {text} <Icon type="upload" />
      </Button>
    </Upload>
  );
};

export default ButtonUploadFile;
