import React from 'react';
import { Upload, Icon } from 'antd';

import './_style.scss';

const { Dragger } = Upload;

const DragUploadFile = ({
  change,
  text,
  description,
  accept,
  remove,
  disabled,
  showUploadList,
  filelist
}) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const props = {
    name: 'file',
    multiple: false,
    customRequest: dummyRequest,
    onChange: change,
    accept,
    onRemove: remove,
    disabled,
    showUploadList,
    fileList: filelist
  };

  return (
    <div className="DraggerFile">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{text}</p>
        <p className="ant-upload-hint">{description}</p>
      </Dragger>
    </div>
  );
};
export default DragUploadFile;
