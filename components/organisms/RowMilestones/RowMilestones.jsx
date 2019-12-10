import React from 'react';
import { Row, Col, Divider, Collapse } from 'antd';
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

const RowMilestones = ({ ActionMilestones, ActionsActivities }) => (
  <Row className="WrapperTable">
    <Col
      className="gutter-row TableMilestones"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={18}
      lg={{ span: 19 }}
    >
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={18}
        lg={{ span: 3 }}
      >
        <h3>Milestone 1</h3>
      </Col>
      <Col
        className="gutter-row vertical"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={18}
        lg={{ span: 4 }}
      >
        <RowLabel text="Quarter" />
        <Info text="May-Jul 2019	" />
      </Col>
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={18}
        lg={{ span: 10 }}
      >
        <RowLabel text="Tasks" />
        <Info text="Disbursed at least 20k USD of FISA to students	" />
      </Col>
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={18}
        lg={{ span: 10 }}
      >
        <RowLabel text="Social Impacts Targets" />
        <Info text="5-7 students have financial resources to go to university	" />
      </Col>
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={9}
        lg={{ span: 10 }}
      >
        <RowLabel text="Review Criterion" />
        <Info text="Planning and legal procedures for pilot study can proceed - Clinicians participating in recruitment identified" />
      </Col>
      <Col
        className="gutter-row "
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={9}
        lg={{ span: 10 }}
      >
        <RowLabel text="Review Criterion" />
        <Info text="2 new full-time employees hired" />
      </Col>
    </Col>
    <Col
      className="WrapperActions flex space-between"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={4}
      lg={{ span: 5 }}
    >
      {ActionMilestones}
    </Col>
    <Col
      className="WrapperActivities"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={24}
      lg={{ span: 24 }}
    >
      <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="Activities" key="1">
          <div className="SubWrapperActivities">
            <Col
              className="gutter-row TableActivities"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={22}
              lg={{ span: 21 }}
            >
              <Col
                className="gutter-row "
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={3}
                lg={{ span: 2 }}
              >
                <h3>Activity 1</h3>
              </Col>
              <Col
                className="gutter-row vertical"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={3}
                lg={{ span: 3 }}
              >
                <RowLabel text="Asigned Oracle" />
                <Info text="Michael Son" />
              </Col>
              <Col
                className="gutter-row "
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={9}
                lg={{ span: 9 }}
              >
                <RowLabel text="Task" />
                <Info
                  text="Implement a marketing and communication plan in Universities
        across Cambodia /and also othere countries with lower focus"
                />
              </Col>
              <Col
                className="gutter-row "
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={9}
                lg={{ span: 9 }}
              >
                <RowLabel text="Social Impacts Targets" />
                <Info text="200 students know about FISA and can take action" />
              </Col>
              <Col
                className="gutter-row "
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={9}
                lg={{ span: 9 }}
              >
                <RowLabel text="Review Criterion" />
                <Info text="200 students know about FISA and can take action Evidence" />
              </Col>
              <Col
                className="gutter-row "
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={9}
                lg={{ span: 9 }}
              >
                <RowLabel text="Review Criterion" />
                <Info text="2 new full-time employees hired" />
              </Col>
            </Col>
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
          </div>
        </Panel>
      </Collapse>
    </Col>
  </Row>
);
export default RowMilestones;
