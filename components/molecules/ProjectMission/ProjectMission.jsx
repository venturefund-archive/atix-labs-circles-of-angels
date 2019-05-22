import React from 'react';
import { Steps } from 'antd';
import './_style.scss';

const { Step } = Steps;

const ProjectMission = ({ mission, terms }) => (
  <div className="ProjectMission">
    <div className="block">
      <h1 className="title">Our Mission</h1>
      <p>{mission}</p>
    </div>
    <div className="block">
      <h1 className="title">Problem Addressed</h1>
      <p>{terms}</p>
    </div>
    <div className="block">
      <h1 className="title">Project Progress</h1>
      <Steps size="small" current={1}>
        <Step />
        <Step title="USD 25K" />
        <Step title="USD 10K" />
      </Steps>
    </div>
  </div>
);

export default ProjectMission;
