import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Col, Row } from 'antd';
import ProjectMilestonesProgress from '../ProjectMilestonesProgress/ProjectMilestonesProgress';
import ProjectMission from '../ProjectMission/ProjectMission';

const ProjectDetailsTab = ({
  proposal,
  mission,
  problem,
  progress,
  hidden
}) => (
  <Row className="ProjectContent">
    <ProjectMission mission={mission} problem={problem} proposal={proposal} />
    {hidden && (
      <>
        <Col span={1}>
          <Divider />
        </Col>
        <ProjectMilestonesProgress projectProgress={progress} />
      </>
    )}
  </Row>
);

ProjectDetailsTab.defaultProps = {
  mission: '-',
  problem: '-',
  proposal: undefined,
  progress: 0
};

ProjectDetailsTab.propTypes = {
  mission: PropTypes.string,
  problem: PropTypes.string,
  proposal: PropTypes.string,
  progress: PropTypes.number,
  hidden: PropTypes.bool.isRequired
};

export default ProjectDetailsTab;
