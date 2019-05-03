import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import './_style.scss';
import CustomButton from '../CustomButton/CustomButton';

const ButtonUpload = ({
  change,
  name,
  typeAccepts,
  buttonText,
  showUploadList,
  defaultFileList,
  hideButton,
  onRemove,
  beforeUpload,
  listType
}) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const props = {
    name,
    customRequest: dummyRequest,
    onChange: change,
    accept: typeAccepts,
    showUploadList,
    defaultFileList,
    onRemove,
    beforeUpload,
    listType
  };

  return (
    <Upload {...props}>
      {!hideButton && (
        <Button>
          {buttonText} <Icon type="upload" />
        </Button>
      )}
    </Upload>
  );
};

export default ButtonUpload;
