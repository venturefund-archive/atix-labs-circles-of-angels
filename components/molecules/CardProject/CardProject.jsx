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
import { PROJECT_STATUS_MAP } from 'model/projectStatus';
import { PROJECT_TYPE_MAP } from 'model/projectType';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import './_style.scss';
import { projectCardPropType } from '../../../helpers/proptypes';
import { formatCurrency, formatTimeframeValue } from '../../../helpers/formatter';

const CardProject = ({ onClick, project, countries }) => {
  const {
    cardPhotoPath,
    goalAmount,
    location,
    projectName,
    timeframe,
    status,
    beneficiary,
    currency,
    timeframeUnit,
    revision,
    type
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
          <div>
            <h1 className="m-cardProject__body__titleContainer__title">{projectName} </h1>
            <p className="m-cardProject__body__titleContainer__title__rev">Rev: {revision}</p>
          </div>
          <div className="m-cardProject__body__tagsContainer">
            {type && (
              <CoaTag predefinedColor={PROJECT_TYPE_MAP[type?.toLowerCase()]?.color}>
                {PROJECT_TYPE_MAP[type]?.name}
              </CoaTag>
            )}
            {status && (
              <CoaTag predefinedColor={PROJECT_STATUS_MAP[status?.toLowerCase()]?.color}>
                {PROJECT_STATUS_MAP[status]?.name}
              </CoaTag>
            )}
          </div>
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
            title={formatTimeframeValue({ timeframe, timeframeUnit })}
            iconInfoItem="clock-circle"
            className="m-cardProject__body__description__timeframe"
          />
          <Divider type="vertical" className="m-cardProject__body__divider" />
          <InfoItem
            subtitle="Budget"
            title={formatCurrency(currency, goalAmount)}
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
