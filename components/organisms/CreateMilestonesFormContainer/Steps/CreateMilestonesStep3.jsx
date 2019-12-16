import React from 'react';
import { Row, Col, Tag, Progress } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import RowMilestones from '../../RowMilestones/RowMilestones';

const Actions = () => (
  <div className="space-between w100">
    <Tag color="#27AE60">Claimable!</Tag>
    <div style={{ width: 120 }}>
      <Progress percent={30} />
    </div>
  </div>
);

export default function CreateMilestonesStep1({ fields, handleChange }) {
  return (
    <div className="Step3">
      <Row type="flex" justify="space-around" align="top">
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={6}
          lg={{ span: 12, offset: 0 }}
        >
          <TitlePage textTitle="Preview and edit Milestones" />
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={6}
          lg={{ span: 3, offset: 9 }}
        >
          <CustomButton buttonText="+ New Milestone" theme="Alternative" />
        </Col>
      </Row>
      <RowMilestones ActionMilestones={Actions} />
      <RowMilestones />
    </div>
  );
}
