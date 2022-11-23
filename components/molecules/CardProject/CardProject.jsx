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
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { Divider } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import './_style.scss';
import { projectCardPropType } from '../../../helpers/proptypes';
import projectStatusMap from '../../../model/projectStatus';
import { formatTimeframeValue } from '../../../helpers/formatter';

const CardProject = ({ onClick, project, countries }) => {
  const {
    cardPhotoPath,
    goalAmount,
    location,
    projectName,
    timeframe,
    status,
    beneficiary
  } = project;
  const locationsNames = () => {
    if (!location) return 'Not set';
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
    <div
      onClick={onClick}
      role="button"
      className="m-cardProject"
      onKeyPress={onClick}
      tabIndex="0"
    >
      <div className="m-cardProject__cover">
        <img
          src={
            cardPhotoPath
              ? `${process.env.NEXT_PUBLIC_URL_HOST}${cardPhotoPath}`
              : '/static/images/empty-img.svg'
          }
        />
      </div>
      <div className="m-cardProject__body">
        <div className="m-cardProject__body__titleContainer">
          <h1 className="m-cardProject__body__titleContainer__title">{projectName}</h1>
          <CoaTag predefinedColor={projectStatusMap[status?.toLowerCase()]?.color}>
            {projectStatusMap[status].name}
          </CoaTag>
        </div>
        <div className="m-cardProject__body__description">
          <InfoItem
            subtitle="Country of Impact"
            title={locationsNames()}
            iconInfoItem="environment"
            className="m-cardProject__body__description__country"
          />
          <Divider type="vertical" className="m-cardProject__body__divider" />
          <InfoItem
            subtitle="Timeframe"
            title={formatTimeframeValue(timeframe)}
            iconInfoItem="clock-circle"
            className="m-cardProject__body__description__timeframe"
          />
          <Divider type="vertical" className="m-cardProject__body__divider" />
          <InfoItem
            subtitle="Budget"
            title={`$ ${goalAmount}`}
            iconInfoItem="dollar"
            className="m-cardProject__body__description__budget"
          />
          <Divider type="vertical" className="m-cardProject__body__divider" />
          <InfoItem
            subtitle="Beneficiary name"
            title={beneficiaryCompleteName}
            className="m-cardProject__body__description__beneficiary"
          />
        </div>
      </div>
    </div>
  );
};

CardProject.defaultProps = {
  onClick: () => null,
  countries: []
};

CardProject.propTypes = {
  project: PropTypes.shape(projectCardPropType).isRequired,
  onClick: PropTypes.func,
  countries: PropTypes.arrayOf({
    name: PropTypes.string,
    value: PropTypes.number
  })
};

export default CardProject;
