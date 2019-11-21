import React from 'react';
import { Row, Col } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import RowMilestones from '../../RowMilestones/RowMilestones';

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
      <RowMilestones />
      <RowMilestones />
    </div>
  );
}
