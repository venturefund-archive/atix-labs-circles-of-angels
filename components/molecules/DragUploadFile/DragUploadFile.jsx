import React from 'react';
import { Upload, Icon, message } from 'antd';

import './_style.scss';

const { Dragger } = Upload;

const DragUploadFile = ({ change, status, errors }) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const props = {
    name: 'file',
    multiple: false,
    customRequest: dummyRequest,
    onChange: change
  };

  const iconType = status === 1 ? 'exclamation-circle' : 'close-circle';
  const iconColor = status === 1 ? '#728099' : '#FF0050'; // "#15D380"

  return (
    <div className="UploadExcelFiles">
      <div className="DraggerFile">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Complete Excel and upload to create Milestones
          </p>
          <p className="ant-upload-hint">Click or drag your Excel file here</p>
        </Dragger>
      </div>
      <div className="FileVerification">
        <Icon
          type={iconType}
          theme="twoTone"
          twoToneColor={iconColor}
          className="IconVerify"
        />
        <h2>File Verification</h2>
        <ul>
          {errors.map((item, i) => (
            <li key={i}>
              At Row: {item.rowNumber} - {item.msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DragUploadFile;
