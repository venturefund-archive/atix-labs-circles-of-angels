import React from 'react';
import { Upload, Icon, message } from 'antd';

import './_style.scss';

const { Dragger } = Upload;

const DragUploadFile = ({ change }) => {
  const props = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange: change
  };
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
          type="check-circle"
          theme="twoTone"
          twoToneColor="#15D380"
          className="IconVerify"
        />
        <h2>File Verification</h2>
        <p>Project's Detail created successfully !</p>
      </div>
    </div>
  );
};
export default DragUploadFile;
