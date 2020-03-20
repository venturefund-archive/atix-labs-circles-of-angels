/* eslint-disable react/no-danger */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import './_style.scss';
import ProjectMilestonesProgress from '../ProjectMilestonesProgress/ProjectMilestonesProgress.jsx';

const ProjectMission = ({ mission, problem, proposal }) => (
  <Col className="ProjectMission" span={24}>
    <div className="block">
      <h1 className="title">Our Mission</h1>
      <p>{mission}</p>
    </div>
    <div className="block">
      <h1 className="title">Problem Addressed</h1>
      <p>{problem}</p>
    </div>
    {proposal && (
      <div className="block">
        <h1 className="title">Proposal</h1>
        <div dangerouslySetInnerHTML={{ __html: proposal }} />
      </div>
    )}
    <ProjectMilestonesProgress projectProgress="100"/>
  </Col>
);

ProjectMission.defaultProps = {
  proposal: undefined
};

ProjectMission.propTypes = {
  mission: PropTypes.string.isRequired,
  problem: PropTypes.string.isRequired,
  proposal: PropTypes.string
};

export default ProjectMission;
