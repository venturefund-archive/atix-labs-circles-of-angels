/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Steps, Row, Col } from 'antd';
import './_style.scss';
import MilestoneBudgetStatus from '../../../constants/MilestoneBudgetStatus';

const { Step } = Steps;

const getBudget = milestone => {
  const budget =
    milestone.budget ||
    milestone.activities.reduce(
      (sum, activity) => sum + Number(activity.budget),
      0
    );

  const prefix = 'USD';
  return budget < 1000 ? `${prefix} ${budget}` : `${prefix} ${budget / 1000}K`;
};

const ProjectMission = ({ mission, terms, startedProject, milestones }) => {
  let currentMilestone = 0;

  // if (milestones) {
  //   milestones.some((milestone, index) => {
  //     if (milestone.budgetStatus.id === MilestoneBudgetStatus.BLOCKED) {
  //       currentMilestone = index > 0 ? index - 1 : index;
  //     } else if (index === milestones.length - 1) {
  //       currentMilestone = index;
  //     }
  //     return milestone.budgetStatus.id === MilestoneBudgetStatus.BLOCKED;
  //   });
  // }

  return (
    <Col className="ProjectMission" span={24}>
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
        {startedProject && milestones && (
          <Steps size="small" current={currentMilestone}>
            {milestones.map((milestone, i) =>
              i < currentMilestone ? (
                <Step key={milestone.id} />
              ) : (
                <Step title={getBudget(milestone)} key={milestone.id} />
              )
            )}
          </Steps>
        )}
      </div>
    </Col>
  );
};

export default ProjectMission;
