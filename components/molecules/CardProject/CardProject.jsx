/* eslint-disable jsx-a11y/alt-text */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Divider, Row, Col, Icon} from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import './_style.scss';
import { projectCardPropType } from '../../../helpers/proptypes';
import projectStatusMap from '../../../model/projectStatus';

const CardProject = ({ showTag, onClick, tagClick, project }) => {
  const {
    cardPhotoPath,
    goalAmount,
    location,
    projectName,
    timeframe,
    status,
    following
  } = project;
  return (
    <Col className="CardProject" span={8}>
      {showTag && (
        <Tag color="orange" onClick={tagClick}>
          View my activities to verify
        </Tag>
      )}
      <div onClick={onClick}>
        <div className="ProjectDescription">
          <img src={cardPhotoPath || '/static/images/empty-img.svg'} />
          {status && (
            <Tag color={projectStatusMap[status].color}>
              {projectStatusMap[status].name}
            </Tag>
          )}
          {following ? (
            <Tag className="Follow" color="#4C7FF7" align="right">
              Following
              <Icon type="check" style={{ color: 'white' }} />
            </Tag>
          ) : (
            ''
          )}
        </div>
        <Row className="ProjectSummery">
          <Col span={24}>
            <h1>{projectName}</h1>
          </Col>
          <Col align="middle" span={24}>
            <InfoItem
              xs={24}
              lg={7}
              subtitle="Country of Impact"
              title={location}
              iconInfoItem="environment"
            />
            <Col span={1}  xs={0} >
              <Divider type="vertical" />
            </Col>
            <InfoItem
              xs={24}
              lg={7}
              subtitle="Timeframe"
              title={timeframe}
              iconInfoItem="clock-circle"
            />
            <Col span={1} xs={0} >
              <Divider type="vertical" />
            </Col>
            <InfoItem
              xs={24}
              lg={7}
              subtitle="Amount"
              title={`$ ${goalAmount}`}
              iconInfoItem="dollar"
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
};

CardProject.defaultProps = {
  showTag: false,
  onClick: () => null,
  tagClick: () => null
};

CardProject.propTypes = {
  project: PropTypes.shape(projectCardPropType).isRequired,
  onClick: PropTypes.func,
  tagClick: PropTypes.func,
  showTag: PropTypes.bool
};

export default CardProject;
