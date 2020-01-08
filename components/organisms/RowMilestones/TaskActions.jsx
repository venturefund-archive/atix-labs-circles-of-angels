import React from 'react';
import { Col, Divider } from 'antd';

// TODO: pass props to this component
const TaskActions = () => (
  <Col
    className="WrapperActionsActivities"
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={2}
    lg={{ span: 3 }}
  >
    <Col span={24}>
      <a className="blueLink">Edit</a>
    </Col>
    <Divider />
    <Col span={24}>
      <a className="redLink">Delete</a>
    </Col>
  </Col>
);

export default TaskActions;
