import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Col, Row } from 'antd';
import ProjectMilestonesProgress from '../ProjectMilestonesProgress/ProjectMilestonesProgress';
import ProjectMission from '../ProjectMission/ProjectMission';

const ProjectDetailsTab = ({
  proposal,
  proposalFile,
  agreementFile,
  mission,
  problem,
  progress
}) => (
  <Row className="ProjectContent">
    <ProjectMission
      mission={mission}
      problem={problem}
      proposal={proposal}
      proposalFile={proposalFile}
      agreementFile={agreementFile}
    />
    <Col span={1}>
      <Divider />
    </Col>
    {/* <ProjectMilestonesProgress projectProgress={progress} /> */}
  </Row>
);

ProjectDetailsTab.defaultProps = {
  mission: '-',
  problem: '-',
  proposal: undefined,
  progress: 0,
  proposalFile: undefined,
  agreementFile: undefined
};

ProjectDetailsTab.propTypes = {
  proposalFile: PropTypes.string,
  agreementFile: PropTypes.string,
  mission: PropTypes.string,
  problem: PropTypes.string,
  proposal: PropTypes.string,
  progress: PropTypes.number
};

export default ProjectDetailsTab;
