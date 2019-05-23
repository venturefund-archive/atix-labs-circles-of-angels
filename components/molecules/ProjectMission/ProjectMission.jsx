import React from 'react';
import { Steps } from 'antd';
import './_style.scss';
import MilestoneActivityStatus from '../../../constants/MilestoneActivityStatus';

const { Step } = Steps;

const getBudget = milestone => {
  const budget = milestone.budget;
  const prefix = 'USD';
  return budget < 1000 ? `${prefix} ${budget}` : `${prefix} ${budget / 1000}K`;
};

const ProjectMission = ({ mission, terms, startedProject, milestones }) => {
  let actualMilestone = 0;
  for (let key in milestones) {
    if (
      milestones[key].status.status === MilestoneActivityStatus.STARTED ||
      milestones[key].status.status === MilestoneActivityStatus.PENDING
    ) {
      actualMilestone = parseInt(key);
      break;
    }
  }
  return (
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
        {startedProject && (
          <Steps size="small" current={actualMilestone}>
            {milestones.map((milestone, i) =>
              milestone.status.status === MilestoneActivityStatus.COMPLETED ? (
                <Step key={i} />
              ) : (
                <Step title={getBudget(milestone)} key={i} />
              )
            )}
          </Steps>
        )}
      </div>
    </div>
  );
};

export default ProjectMission;
