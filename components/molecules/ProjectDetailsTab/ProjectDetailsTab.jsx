import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Col, Row } from 'antd';
import ProjectMilestonesProgress from '../ProjectMilestonesProgress/ProjectMilestonesProgress';
import ProjectMission from '../ProjectMission/ProjectMission';

const ProjectDetailsTab = ({ mission, problem, progress }) => (
  <Row className="ProjectContent">
    <ProjectMission mission={mission} problem={problem} />
    <Col span={1}>
      <Divider />
    </Col>
    <ProjectMilestonesProgress projectProgress={progress} />
  </Row>
);

ProjectDetailsTab.defaultProps = {
  mission: '-',
  problem: '-',
  progress: 0
};

ProjectDetailsTab.propTypes = {
  mission: PropTypes.string,
  problem: PropTypes.string,
  progress: PropTypes.number
};

export default ProjectDetailsTab;
