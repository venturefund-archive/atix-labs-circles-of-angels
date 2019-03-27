import React from 'react';
import { Upload, Button, Icon } from 'antd';
import './_style.scss';

const ButtonUploadImage = ({ change, name, typeAccepts }) => {
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
        Upload Image <Icon type="upload" />
      </Button>
    </Upload>
  );
};

export default ButtonUploadImage;
