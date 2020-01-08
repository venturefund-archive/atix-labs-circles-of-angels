import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import RowMilestones from '../../RowMilestones/RowMilestones';

export default function CreateMilestonesStep3({ milestones }) {
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
      <RowMilestones milestones={milestones} />
    </div>
  );
}

CreateMilestonesStep3.defaultProps = {
  milestones: []
};

CreateMilestonesStep3.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      taskHash: PropTypes.string,
      description: PropTypes.string,
      reviewCriteria: PropTypes.string,
      category: PropTypes.string,
      keyPersonnel: PropTypes.string,
      budget: PropTypes.string
    })
  )
};
