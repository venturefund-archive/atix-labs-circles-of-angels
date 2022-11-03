/* eslint-disable jsx-a11y/alt-text */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Divider, Row, Col, Icon, Button } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import { projectCardPropType } from '../../../helpers/proptypes';
import projectStatusMap from '../../../model/projectStatus';
import { formatTimeframeValue } from '../../../helpers/formatter';

const CardProject = ({ showTag, onClick, tagClick, project, hoverText, countries }) => {
  const {
    cardPhotoPath,
    goalAmount,
    location,
    projectName,
    timeframe,
    status,
    following,
    applied,
    beneficiary = 'unset'
  } = project;
  const locationsNames = () => {
    const countriesIds = countries.filter(
      // eslint-disable-next-line radix
      country => location.split(',').includes(String(country.value))
    );
    if (!countriesIds.length) {
      return location;
    }
    return countriesIds.map(country => country.name).join(', ');
  };

  return (
    <Col className="ProjectCard" span={8} xs={24} md={12} lg={8}>
      {showTag && (
        <Tag color="orange" onClick={tagClick}>
          View my activities to verify
        </Tag>
      )}
      <div onClick={onClick} role="presentation">
        {hoverText && (
          <Button type="text" className="hoverText">
            {hoverText}
          </Button>
        )}
        <div className="ProjectDescription">
          <img src={cardPhotoPath || 'images/empty-img.svg'} />
          <div className="BlockTags">
            {status && (
              <Tag color={projectStatusMap[status].color}>{projectStatusMap[status].name}</Tag>
            )}
            {following && (
              <Tag className="Follow" align="right">
                Following
                <Icon type="check" style={{ color: '#4C7FF77' }} />
              </Tag>
            )}
            {applied && (
              <Tag className="Applied" color="#DF5BD2" align="right">
                Applied
                <Icon type="check" style={{ color: 'white' }} />
              </Tag>
            )}
          </div>
        </div>
        <Row className="ProjectSummary">
          <Col span={20}>
            <h1 className="ProjectName">{projectName}</h1>
          </Col>
          <Col span={4}>
            <div className="BlockTags">
              {status && (
                <Tag color={projectStatusMap[status].color}>{projectStatusMap[status].name}</Tag>
              )}
              {following && (
                <Tag className="Follow" align="right">
                  Following
                  <Icon type="check" style={{ color: '#4C7FF77' }} />
                </Tag>
              )}
              {applied && (
                <Tag className="Applied" color="#DF5BD2" align="right">
                  Applied
                  <Icon type="check" style={{ color: 'white' }} />
                </Tag>
              )}
            </div>
          </Col>
          <Col align="middle" span={24}>
            <InfoItem
              xs={24}
              lg={6}
              subtitle="Country of Impact"
              title={locationsNames()}
              iconInfoItem="environment"
            />
            <Col span={1} xs={0}>
              <Divider type="vertical" />
            </Col>
            <InfoItem
              xs={24}
              lg={6}
              subtitle="Timeframe"
              title={formatTimeframeValue(timeframe)}
              iconInfoItem="clock-circle"
            />
            <Col span={1} xs={0}>
              <Divider type="vertical" />
            </Col>
            <InfoItem
              xs={24}
              lg={6}
              subtitle="Amount"
              title={`$ ${goalAmount}`}
              iconInfoItem="dollar"
            />
            <InfoItem xs={24} lg={6} subtitle="Beneficiary name" title={beneficiary?.firstName} />
          </Col>
        </Row>
      </div>
    </Col>
  );
};

CardProject.defaultProps = {
  showTag: false,
  onClick: () => null,
  tagClick: () => null,
  hoverText: null,
  countries: []
};

CardProject.propTypes = {
  project: PropTypes.shape(projectCardPropType).isRequired,
  onClick: PropTypes.func,
  tagClick: PropTypes.func,
  showTag: PropTypes.bool,
  hoverText: PropTypes.string,
  countries: PropTypes.arrayOf({
    name: PropTypes.string,
    value: PropTypes.number
  })
};

export default CardProject;
