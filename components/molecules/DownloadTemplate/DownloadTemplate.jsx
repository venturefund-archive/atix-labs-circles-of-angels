import React from "react";
import { Button, Icon } from "antd";
import "./_style.scss";

const DownloadTemplate = ({ subtitle, text, click }) => (
  <div className="DownloadTemplateContainer">
    <div className="TemplateText">
      <h2>{subtitle}</h2>
      <p>{text}</p>
    </div>
    <Button onClick={click}>
      Download Excel File <Icon type="download" />
    </Button>
  </div>
);

export default DownloadTemplate;
