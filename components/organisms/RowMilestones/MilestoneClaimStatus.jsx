import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const MilestoneClaimStatus = (
  { text, onClick, color, theme },
  showClaimStatus,
  progress,
  allowClaimMilestone
) => (
  <div className="space-between w100">
    {showClaimStatus && <Tag color={color}>{text}</Tag>}
    {onClick ? (
      <CustomButton
        theme={theme}
        onClick={onClick}
        buttonText="Claim now!"
        hidden={!showClaimStatus || !allowClaimMilestone}
      />
    ) : (
      ''
    )}
    {/* <div style={{ width: 120 }}>
      <Progress percent={progress} />
    </div> */}
  </div>
);

export default MilestoneClaimStatus;

MilestoneClaimStatus.defaultProps = {
  text: undefined,
  theme: undefined,
  color: undefined,
  onClick: () => undefined
};

MilestoneClaimStatus.propTypes = {
  text: PropTypes.string,
  theme: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};
