import React from "react";
import { Input, Icon } from "antd";

import "./_style.scss";

const WebFormProject = () => (
  <div className="WebFormProject">
    <Input
      placeholder="Project Name"
      prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
    />
    <Input
      placeholder="Project Mission"
      prefix={<Icon type="star" style={{ color: "rgba(0,0,0,.25)" }} />}
    />
    <Input
      placeholder="Problem Addressed"
      prefix={<Icon type="alert" style={{ color: "rgba(0,0,0,.25)" }} />}
    />
    <Input
      placeholder="Enterprice"
      prefix={<Icon type="global" style={{ color: "rgba(0,0,0,.25)" }} />}
    />
    <Input
      placeholder="Timeframe"
      prefix={<Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />}
    />
    <Input
      placeholder="Goal Amount"
      prefix={<Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />}
    />
    <Input
      placeholder="FAQ Google Doc Link"
      prefix={<Icon type="google" style={{ color: "rgba(0,0,0,.25)" }} />}
    />
  </div>
);
export default WebFormProject;
