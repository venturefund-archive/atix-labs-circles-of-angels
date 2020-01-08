import React from 'react';
import PropTypes from 'prop-types';
import { Col, Collapse } from 'antd';
import RowLabel from './RowLabel';
import Info from './Info';
import TaskActions from './TaskActions';

const { Panel } = Collapse;

const TaskRow = (task, index) => (
  <Col span={24} key={task.id}>
    <Col
      className="gutter-row TableActivities"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={9}
      lg={{ span: 21 }}
    >
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={3}
        lg={{ span: 3 }}
      >
        <h3>Activity {index}</h3>
      </Col>
      <Col
        className="gutter-row vertical"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={3}
        lg={{ span: 12 }}
      >
        <RowLabel text="Asigned Oracle" />
        <Info text={task.oracle} />
      </Col>
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={9}
        lg={{ span: 12 }}
      >
        <RowLabel text="Task" />
        <Info text={task.description} />
      </Col>
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={9}
        lg={{ span: 12 }}
      >
        <RowLabel text="Social Impacts Targets" />
        <Info text={task.impact} />
      </Col>
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={9}
        lg={{ span: 12 }}
      >
        <RowLabel text="Review Criterion" />
        <Info text={task.review} />
      </Col>
    </Col>
    <TaskActions />
  </Col>
);

const MilestoneTasks = ({ tasks }) => {
  const tasksElements = tasks.map((task, i) => TaskRow(task, i));
  return (
    <Col
      className="WrapperActivities"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={24}
      lg={{ span: 24 }}
    >
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Activities" key="1">
          <div className="SubWrapperActivities">{tasksElements}</div>
        </Panel>
      </Collapse>
    </Col>
  );
};

MilestoneTasks.defaultProps = {
  tasks: []
};

MilestoneTasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      oracle: PropTypes.string,
      description: PropTypes.string,
      impact: PropTypes.string,
      review: PropTypes.string
    })
  )
};

export default MilestoneTasks;
