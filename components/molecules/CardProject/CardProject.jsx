/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Tag, Progress, Row, Col } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import './_style.scss';

const CardProject = ({
  enterpriseName,
  enterpriseLocation,
  timeframe,
  amount,
  showTag,
  onClick,
  tagClick,
  milestoneProgress,
  projectId
}) => (
  <Col className="CardProject" span={8}>
    {showTag && (
      <Tag color="orange" onClick={tagClick}>
        View my activities to verify
      </Tag>
    )}

    <div onClick={onClick}>
      <div className="ProjectDescription">
        <img
          src={`/files/projects/${projectId}/cardPhoto.jpg`}
          alt="projectCardImage"
        />
      </div>
      <Row className="ProjectSummery">
        <Col span={24}>
          <h1>{enterpriseName}</h1>
        </Col>
        <Col span={24}>
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
        </Col>
      </Row>
    </div>
  </Col>
);

export default CardProject;
