import React from 'react';
import PropTypes from 'prop-types';
import './radial-bar-chart.scss';
import { removeDecimals } from 'helpers/formatter';

export const RadialBarChart = ({
  className,
  currentExternalDonutValue,
  totalExternalDonutValue,
  currentInternalDonutValue,
  totalInternalDonutValue,
  externalDonutColor,
  internalDonutColor,
  externalDonutLabel,
  internalDonutLabel,
  externalDonutSymbol,
  internalDonutSymbol
}) => {
  const externalDonutPercent =
    currentExternalDonutValue <= totalExternalDonutValue
      ? removeDecimals((currentExternalDonutValue / totalExternalDonutValue) * 100 || 0)
      : 100;
  const internalDonutPercent =
    currentInternalDonutValue <= totalInternalDonutValue
      ? removeDecimals((currentInternalDonutValue / totalInternalDonutValue) * 100 || 0)
      : 100;
  return (
    <div className={`m-radialBarChart__container ${className}`}>
      <div className="m-radialBarChart__container__graph">
        <div
          className="m-radialBarChart__container__graph__percent --bigger"
          style={{
            '--clr': externalDonutColor,
            '--num': externalDonutPercent
          }}
        >
          <div className="m-radialBarChart__container__graph__dot --end">
            <div className="m-radialBarChart__container__graph__dot__content --end">
              {externalDonutPercent}
              {externalDonutSymbol}
            </div>
          </div>
          <div className="m-radialBarChart__container__graph__dot --init">
            <div className="m-radialBarChart__container__graph__dot__content --init">
              {externalDonutSymbol}
            </div>
          </div>
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70"></circle>
          </svg>
        </div>
        <div
          className="m-radialBarChart__container__graph__percent --smaller"
          style={{
            '--clr': internalDonutColor,
            '--num': internalDonutPercent
          }}
        >
          <div className="m-radialBarChart__container__graph__dot --end">
            <div className="m-radialBarChart__container__graph__dot__content --end">
              {internalDonutPercent}%
            </div>
          </div>
          <div className="m-radialBarChart__container__graph__dot --init">
            <div className="m-radialBarChart__container__graph__dot__content --init">
              {internalDonutSymbol}
            </div>
          </div>
          <svg>
            <circle cx="50" cy="50" r="50"></circle>
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <div className="text">
            <p className="bigger">{externalDonutLabel}</p>
            <p className="smaller">{internalDonutLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

RadialBarChart.propTypes = {
  currentExternalDonutValue: PropTypes.number,
  totalExternalDonutValue: PropTypes.number,
  currentInternalDonutValue: PropTypes.number,
  totalInternalDonutValue: PropTypes.number,
  externalDonutColor: PropTypes.string,
  internalDonutColor: PropTypes.string,
  externalDonutLabel: PropTypes.string,
  internalDonutLabel: PropTypes.string,
  externalDonutSymbol: PropTypes.string,
  internalDonutSymbol: PropTypes.string,
  className: PropTypes.string
};

RadialBarChart.defaultProps = {
  currentExternalDonutValue: 0,
  totalExternalDonutValue: 0,
  currentInternalDonutValue: 0,
  totalInternalDonutValue: 0,
  externalDonutColor: '#08ceaa',
  internalDonutColor: '26385b',
  externalDonutLabel: 'Project Progress',
  internalDonutLabel: 'Project Balance',
  externalDonutSymbol: '%',
  internalDonutSymbol: '$',
  className: ''
};
