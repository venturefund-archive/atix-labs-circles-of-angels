import React from 'react';
import { Row, Col, Divider, Collapse, Tag, Progress } from 'antd';
import './_style.scss';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const RowLabel = ({ text }) => (
  <Col className="gutter-row " span={24}>
    <label>{text}</label>
  </Col>
);
const Info = ({ text }) => (
  <Col className="gutter-row " span={24}>
    <p>{text}</p>
  </Col>
);

const MilestoneRow = ({ className, span, children }) => (
  <Col
    className="gutter-row TableMilestones"
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={19}
    lg={{ span:19 }}
  >
    {children}
  </Col>
);

const MilestoneCol = ({ className, span, children }) => (
  <Col
    className={`gutter-row ${className}`}
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={18}
    lg={{ span }}
  >
    {children}
  </Col>
);

const Milestone = ({ milestone, index }) => {
  console.log('milestone', milestone);
  return (
    <div>
      <MilestoneRow>
        <MilestoneCol span={3}>
          <h3>Milestone {index}</h3>
        </MilestoneCol>
        <MilestoneCol className="vertical" span={4}>
          <RowLabel text="Quarter" />
          <Info text={milestone.quarter} />
        </MilestoneCol>
        <MilestoneCol span={9}>
          <RowLabel text="Tasks" />
          <Info text={milestone.description} />
        </MilestoneCol>
      </MilestoneRow>
      <MilestoneActions milestone={milestone} />
      <MilestoneTasks tasks={milestone.tasks} />
    </div>
  );
};

const MilestoneActions = project => (
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

const TaskActions = task => {
  return (
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
};
const TaskRow = (task, index) => {
  return (
    <Col span={24}>
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
};

const MilestoneTasks = props => {
  console.log(props);
  const { tasks } = props;
  const tasksElements = tasks.map((task, index) => TaskRow(task, index));
  return (
    <Col
      className="WrapperActivities"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={24}
      lg={{ span: 24 }}
    >
      <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="Activities" key="1">
          <div className="SubWrapperActivities">{tasksElements}</div>
        </Panel>
      </Collapse>
    </Col>
  );
};

export default function RowMilestones(props) {
  if (Object.keys(props).length === 0) return null;
  const { milestones } = props;
  const milestoneElements = milestones.map((m, i) => (
    <Milestone milestone={m} index={i} />
  ));
  return (
    <div className="MilestonesDetails">
      <Row className="WrapperTable">{milestoneElements}</Row>
    </div>
  );
}
