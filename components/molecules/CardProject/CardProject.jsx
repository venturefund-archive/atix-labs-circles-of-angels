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
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import './_style.scss';
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
    beneficiary
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

  const beneficiaryFirstName = beneficiary?.firstName || '';
  const beneficiaryLastName = beneficiary?.lastName || '';
  const beneficiaryCompleteName = beneficiary
    ? `${beneficiaryFirstName} ${beneficiaryLastName}`
    : 'Not set';

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
          <img
            src={
              cardPhotoPath
                ? `${process.env.NEXT_PUBLIC_URL_HOST}${cardPhotoPath}`
                : '/static/images/empty-img.svg'
            }
          />
        </div>
        <Row className="ProjectSummary">
          <Col span={24}>
            <Row justify="space-between" type="flex" align="middle">
              <Col>
                <h1 className="ProjectName">{projectName}</h1>
              </Col>
              <Col>
                <div className="BlockTags">
                  {status && (
                    <CoaTag predefinedColor={projectStatusMap[status?.toLowerCase()]?.color}>
                      {projectStatusMap[status].name}
                    </CoaTag>
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
            </Row>
          </Col>
          <Col align="middle" span={24}>
            <Row>
              <Col xs={24} lg={6}>
                <InfoItem
                  subtitle="Country of Impact"
                  title={locationsNames()}
                  iconInfoItem="environment"
                />
              </Col>
              <Col lg={1} xs={0}>
                <Divider type="vertical" className="ProjectSummary__divider" />
              </Col>
              <Col xs={24} lg={4}>
                <InfoItem
                  subtitle="Timeframe"
                  title={formatTimeframeValue(timeframe)}
                  iconInfoItem="clock-circle"
                />
              </Col>
              <Col lg={1} xs={0}>
                <Divider type="vertical" className="ProjectSummary__divider" />
              </Col>
              <Col xs={24} lg={5}>
                <InfoItem subtitle="Amount" title={`$ ${goalAmount}`} iconInfoItem="dollar" />
              </Col>
              <Col lg={1} xs={0}>
                <Divider type="vertical" className="ProjectSummary__divider" />
              </Col>
              <Col xs={24} lg={6}>
                <InfoItem subtitle="Beneficiary name" title={beneficiaryCompleteName} />
              </Col>
            </Row>
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
