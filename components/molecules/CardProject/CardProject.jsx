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
import { PROJECT_STATUS_MAP } from 'model/projectStatus';
import { PROJECT_TYPE_MAP } from 'model/projectType';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import './_style.scss';
import { projectCardPropType } from '../../../helpers/proptypes';
import { formatCurrency, formatTimeframeValue } from '../../../helpers/formatter';

const CardProject = ({ onClick, project, countries, withDescription }) => {
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
      <div
        className="m-cardProject__cover"
        style={{
          backgroundImage: `linear-gradient(0.65deg, rgba(0, 0, 0, 0.7) 0.02%, rgba(0, 0, 0, 0) 50.2%), url(${
            cardPhotoPath
              ? `${process.env.NEXT_PUBLIC_URL_HOST}${cardPhotoPath}`
              : '/static/images/empty-img.svg'
          })`
        }}
      >
        <div className="m-cardProject__cover__titleContainer">
          <div className="m-cardProject__cover__tagsContainer">
            {status && (
              <CoaTag predefinedColor={PROJECT_STATUS_MAP[status?.toLowerCase()]?.color}>
                {PROJECT_STATUS_MAP[status]?.name}
              </CoaTag>
            )}
          </div>
          <h1 className="m-cardProject__cover__titleContainer__title">{projectName} </h1>
        </div>
      </div>
      {withDescription && (
        <div className="m-cardProject__body">
          <InfoItem
            subtitle="Country"
            title={locationsNames()}
            className="m-cardProject__body__country"
          />
          <InfoItem
            subtitle="Timeframe"
            title={formatTimeframeValue({ timeframe, timeframeUnit })}
            className="m-cardProject__body__timeframe"
          />
          <InfoItem
            subtitle="Project Type"
            title={PROJECT_TYPE_MAP[type]?.name}
            className="m-cardProject__body__projectType"
          />
          <InfoItem
            subtitle="Beneficiary"
            title={beneficiaryCompleteName}
            className="m-cardProject__body__beneficiary"
          />
          <InfoItem
            subtitle="Budget"
            title={formatCurrency(currency, goalAmount)}
            iconInfoItem="dollar"
            className="m-cardProject__body__budget"
          />
          <InfoItem
            subtitle="Project version"
            title={revision}
            className="m-cardProject__body__projectVersion"
          />
        </div>
      )}
    </div>
  );
};

CardProject.defaultProps = {
  onClick: () => null,
  countries: [],
  withDescription: false
};

CardProject.propTypes = {
  project: PropTypes.shape(projectCardPropType).isRequired,
  onClick: PropTypes.func,
  countries: PropTypes.arrayOf({
    name: PropTypes.string,
    value: PropTypes.number
  }),
  withDescription: PropTypes.bool
};

export default CardProject;
