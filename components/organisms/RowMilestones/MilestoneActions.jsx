import React from 'react';
import { Col, Progress, Tag } from 'antd';

// TODO: add props
const MilestoneActions = () => (
  <Col
    className="WrapperActions flex space-between"
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={4}
    lg={{ span: 5 }}
  >
    <div className="space-between w100">
      <Tag color="#27AE60">Claimable!</Tag>
      <div style={{ width: 120 }}>
        <Progress percent={30} />
      </div>
    </div>
  </Col>
);

export default MilestoneActions;
