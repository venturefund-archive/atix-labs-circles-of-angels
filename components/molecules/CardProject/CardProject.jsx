/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Tag, Progress } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import './_style.scss';

const CardProject = ({
  enterpriseName,
  projectCardImage,
  enterpriseLocation,
  timeframe,
  amount,
  showTag,
  onClick,
  tagClick,
  milestoneProgress
}) => (
  <div className="CardProject">
    {showTag && (
      <Tag color="orange" onClick={tagClick}>
        View my activities to verify
      </Tag>
    )}

    <div onClick={onClick}>
      <div className="ProjectDescription">
        <img src={projectCardImage} alt="projectCardImage" />
        <div className="GradientEfect">
          <div className="DescriptionData">
            <h1>{enterpriseName}</h1>
          </div>
        </div>
      </div>
      <div className="ProjectSummery">
        <div className="space-between">
          <InfoItem
            subtitle="Country of Impact"
            title={enterpriseLocation}
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
        <Progress
          size="small"
          showInfo={false}
          strokeColor="#22C89B"
          percent={milestoneProgress || 0}
          status="active"
        />
      </div>
    </div>
  </div>
);

export default CardProject;
