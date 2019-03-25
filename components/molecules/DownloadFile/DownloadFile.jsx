import React from "react";
import { Button, Icon } from "antd";
import "./_style.scss";

const DownloadFile = ({ subtitle, text, buttonText, click }) => (
  <div className="DownloadFileContainer">
    <div className="FileText">
      <h2>{subtitle}</h2>
      <p>{text}</p>
    </div>
    <Button onClick={click}>
      {buttonText} <Icon type="download" />
    </Button>
  </div>
);

export default DownloadFile;
