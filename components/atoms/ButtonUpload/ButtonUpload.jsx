import React from 'react';
import { Upload, Button, Icon } from 'antd';
import './_style.scss';

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
  fileList
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
    beforeUpload
  };

  if (fileList && fileList.length > 0) {
    props.fileList = fileList;
  } else {
    props.fileList = defaultFileList;
  }

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
