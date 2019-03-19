import React from "react";
import { Upload, message, Button, Icon } from "antd";
import "./_style.scss";

const props = {
  name: "file",
  action: "//jsonplaceholder.typicode.com/posts/",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

const ButtonUploadImage = () => (
  <Upload {...props}>
    <Button>
      Upload Image <Icon type="upload" /> 
    </Button>
  </Upload>
);

export default ButtonUploadImage;
