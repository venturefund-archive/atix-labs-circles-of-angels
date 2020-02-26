import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Progress } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const MilestoneClaimStatus = (
  { text, color, onClick },
  showClaimStatus,
  progress
) => (
  <div className="space-between w100">
    {onClick ? (
      <CustomButton
        className="blueLink"
        onClick={onClick}
        buttonText={text}
        hidden={!showClaimStatus}
      />
    ) : (
      <Tag color={color}>{text}</Tag>
    )}
    {/* <div style={{ width: 120 }}>
      <Progress percent={progress} />
    </div> */}
  </div>
);

export default MilestoneClaimStatus;

MilestoneClaimStatus.defaultProps = {
  text: undefined,
  color: 'yellow',
  onClick: () => undefined
};

MilestoneClaimStatus.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};
