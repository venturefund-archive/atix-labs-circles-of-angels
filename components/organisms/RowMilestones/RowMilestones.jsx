import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import './_style.scss';
import Milestone from './Milestone';

const RowMilestones = ({ milestones }) => {
  if (!milestones) return null;
  const milestoneElements = milestones.map((m, i) => (
    <Milestone milestone={m} index={i} key={m.id} />
  ));
  return (
    <div className="MilestonesDetails">
      <Row className="WrapperTable">{milestoneElements}</Row>
    </div>
  );
};

RowMilestones.defaultProps = {
  milestones: []
};

RowMilestones.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      quarter: PropTypes.number,
      tasks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          oracle: PropTypes.string,
          description: PropTypes.string,
          impact: PropTypes.string,
          review: PropTypes.string
        })
      )
    })
  )
};

export default RowMilestones;
