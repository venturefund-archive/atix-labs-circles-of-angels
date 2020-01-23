import React from 'react';
import PropTypes from 'prop-types';
import { Col, Progress } from 'antd';

const ProjectMilestonesProgress = ({ projectProgress }) => (
  <Col className="ProjectProgress" span={24}>
    <div className="block">
      <h1 className="title">Milestones Progress</h1>
    </div>
    <Col span={12}>
      <h4>
        Project <strong>Started</strong>
      </h4>
    </Col>
    <Col className="txtright" span={6} offset={6}>
      <h4>
        Project <strong>Finished!</strong>
      </h4>
    </Col>
    <Col span={1}>
      <h4>
        <strong>0%</strong>
      </h4>
    </Col>
    <Col span={21}>
      <Progress
        strokeColor="#6FCF97"
        percent={projectProgress}
        showInfo={false}
      />
    </Col>
    <Col className="txtright" span={2}>
      <h4>
        <strong>100%</strong>
      </h4>
    </Col>
  </Col>
);

ProjectMilestonesProgress.propTypes = {
  projectProgress: PropTypes.number.isRequired
};

export default ProjectMilestonesProgress;
