import React from "react";
import { Upload, Icon, message } from "antd";

import "./_style.scss";

const Dragger = Upload.Dragger;

const props = {
  name: "file",
  multiple: true,
  action: "//jsonplaceholder.typicode.com/posts/",
  onChange(info) {
    const status = info.file.status;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

const DragUploadFile = () => (
  <div className="UploadExcelFiles">
    <div className="DraggerFile">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Complete Excel and upload to create Milestones</p>
        <p className="ant-upload-hint">Click or drag your Excel file here</p>
      </Dragger>
    </div>
    <div className="FileVerification">
      <Icon type="check-circle" theme="twoTone" twoToneColor="#15D380" className="IconVerify" />
      <h2>File Verification</h2>
      <p>Project's Detail created successfully !</p>
    </div>
  </div>
);
export default DragUploadFile;
