import React from 'react';
import PropTypes from 'prop-types';
import { Col, Progress } from 'antd';

const ProjectMilestonesProgress = ({ projectProgress }) => (
  <Col className="ProjectProgress" span={24}>
    <div className="block">
      <h1 className="title">Progress of funding</h1>
    </div>
    <Col span={12}>
      <h4>
        Project <strong>Started</strong>
      </h4>
    </Col>
    <Col className="txtright" xs={{span:10 , offset:2 }}  lg={{span:6 , offset:6 }} >
      <h4>
        Project <strong>Finished!</strong>
      </h4>
    </Col>
    <Col xs={2} lg={2}>
      <h4>
        <strong>0 USD</strong>
      </h4>
    </Col>
    <Col  xs={19} lg={20}>
      <Progress
        strokeColor="#6FCF97"
        percent={projectProgress}
        showInfo={false}
      />
    </Col>
    <Col className="txtright" xs={3}
    lg={2}>
      <h4>
        <strong>100 USD</strong>
      </h4>
    </Col>
  </Col>
);

ProjectMilestonesProgress.propTypes = {
  projectProgress: PropTypes.number.isRequired
};

export default ProjectMilestonesProgress;
