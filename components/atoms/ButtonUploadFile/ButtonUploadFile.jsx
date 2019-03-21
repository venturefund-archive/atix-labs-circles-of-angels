import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import './_style.scss';

const ButtonUploadFile = ({ change, name, text }) => {
  const props = {
    name,
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text'
    },
    onChange: change
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
