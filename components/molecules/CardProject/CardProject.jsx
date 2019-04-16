import React from 'react';
import { Tag } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import './_style.scss';

const CardProject = ({
  enterpriseName,
  projectCardImage,
  enterpriseLocation,
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
          <h1>{enterpriseName}</h1>
        </div>
      </div>
    </div>
    <div className="ProjectSummery">
      <InfoItem
        subtitle="Enterprise Location"
        title={enterpriseLocation}
        iconInfoItem="environment"
      />
      <InfoItem
        subtitle="Timeframe"
        title={timeframe}
        iconInfoItem="clock-circle"
      />
      <InfoItem subtitle="Amount" title={`$ ${amount}`} iconInfoItem="dollar" />
    </div>
  </div>
);

export default CardProject;
