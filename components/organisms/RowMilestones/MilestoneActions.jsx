import React from 'react';
import PropTypes from 'prop-types';
import { Col, Progress, Tag } from 'antd';
import MilestoneBudgetStatus from '../../../constants/MilestoneBudgetStatus';

// TODO: this is an example on how implement this with the old schema
//       but the budget status property doesn't exist anymore
const statusTagMap = {
  [MilestoneBudgetStatus.CLAIMABLE]: {
    tagColor: '#27AE60',
    tagText: 'Claimable!'
  },
  [MilestoneBudgetStatus.CLAIMED]: {
    tagColor: '#27AE60',
    tagText: 'Claimed!'
  },
  [MilestoneBudgetStatus.FUNDED]: {
    tagColor: '#27AE60',
    tagText: 'Funded!'
  },
  [MilestoneBudgetStatus.BLOCKED]: {
    tagColor: '#27AE60',
    tagText: 'Blocked!'
  }
};

const MilestoneActions = ({ show, status, progress }) => {
  // any defaults? or just don't show the tag if no mapping defined?
  const tagColor = statusTagMap[status]
    ? statusTagMap[status].tagColor
    : undefined;
  const tagText = statusTagMap[status]
    ? statusTagMap[status].tagText
    : undefined;

  return (
    <Col
      className="WrapperActions flex space-between"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={4}
      lg={{ span: 5 }}
    >
      {/* it doesn't really makes much sense to have this prop in the component,
          the condition should be outside, but leaving it here because styles look bad */}
      {show && (
        <div className="space-between w100">
          {tagColor && tagText && <Tag color={tagColor}>{tagText}</Tag>}
          <div style={{ width: 120 }}>
            <Progress percent={progress} />
          </div>
        </div>
      )}
    </Col>
  );
};

MilestoneActions.propTypes = {
  show: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired
};

export default MilestoneActions;
