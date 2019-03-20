import React from 'react';
import { Input, Icon } from 'antd';

import './_style.scss';

const project = {
  faqLink: '',
  goalAmount: '',
  location: '',
  mission: '',
  problemAddressed: '',
  projectName: '',
  timeframe: ''
};
const { TextArea } = Input;

const WebFormProject = ({ change }) => {
  return (
    <div className="WebFormProject">
      <Input
        placeholder="Project Name"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={project.projectName}
        onChange={e => {
          project.projectName = e.target.value;
          change(project);
        }}
      />
      <TextArea
        placeholder="Project Mission"
        prefix={<Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={project.mission}
        onChange={e => {
          project.mission = e.target.value;
          change(project);
        }}
      />
      <TextArea
        placeholder="Problem Addressed"
        prefix={<Icon type="alert" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={project.problemAddressed}
        onChange={e => {
          project.problemAddressed = e.target.value;
          change(project);
        }}
      />
      <Input
        placeholder="Enterprise Location"
        prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={project.location}
        onChange={e => {
          project.location = e.target.value;
          change(project);
        }}
      />
      <Input
        placeholder="Timeframe"
        prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={project.timeframe}
        onChange={e => {
          const { value } = e.target;
          project.timeframe = value;
          change(project);
        }}
      />
      <Input
        placeholder="Goal Amount"
        type="number"
        prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={project.goalAmount}
        onChange={e => {
          const { value } = e.target;
          project.goalAmount = Number(value);
          change(project);
        }}
      />
      <Input
        placeholder="FAQ Google Doc Link"
        prefix={<Icon type="google" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={project.faqLink}
        onChange={e => {
          project.faqLink = e.target.value;
          change(project);
        }}
      />
    </div>
  );
};
export default WebFormProject;
