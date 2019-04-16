import React from 'react';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import { Tag } from 'antd';
import './_style.scss';

const CardProject = ({
  enterpriceName,
  enterpriceMission,
  projectCardImage,
  enterpriceLocation,
  timeframe,
  amount,
  onClick
}) => (
  <div className="CardProject" onClick={onClick}>
    <div className="ProjectDescription">
    <Tag color="orange">View my activities to verify</Tag>
      <img src={projectCardImage} alt="projectCardImage" />
      <div className="GradientEfect">
        <div className="DescriptionData">
        
          <h1>{enterpriceName}</h1>
          <p>{enterpriceMission}</p>
        </div>
      </div>
    </div>
    <div className="ProjectSummery">
      <InfoItem
        subtitle="Enterprise Location"
        title={enterpriceLocation}
        iconInfoItem="environment"
      />
      <InfoItem
        subtitle="Timeframe"
        title={timeframe}
        iconInfoItem="clock-circle"
      />
      <InfoItem
        subtitle="Amount"
        title={`$ ${amount}`}
        iconInfoItem="dollar"
      />
    </div>
  </div>
);

export default CardProject;
