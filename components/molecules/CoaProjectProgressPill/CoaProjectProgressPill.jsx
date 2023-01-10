import React from 'react';
import PropTypes from 'prop-types';
import './coa-project-progress-pill.scss';

export const CoaProjectProgressPill = ({
  indicator,
  total,
  current,
  startBarContent,
  endBarContent,
  progressBarColor,
  barColor,
  currentPercentage
}) => {
  const _currentPercentage =
    currentPercentage || (current <= total ? (current / total) * 100 || 0 : 100);
  const fixedPercentage = _currentPercentage?.toFixed(2);
  return (
    <div className="m-coaProjectProgressPill">
      <h3 className="m-coaProjectProgressPill__indicator">{indicator}</h3>
      <div className="m-coaProjectProgressPill__progress">
        <div className="m-coaProjectProgressPill__progress__texts">
          <div>{startBarContent}</div>
          <div>{endBarContent}</div>
        </div>
        <div className="m-coaProjectProgressPill__progress__barContainer">
          <div>{fixedPercentage}%</div>
          <div className="m-coaProjectProgressPill__bar" style={{ '--barColor': barColor }}>
            <span
              className="m-coaProjectProgressPill__bar__fill"
              style={{
                '--currentPercent': `${fixedPercentage}%`,
                '--progressBarColor': progressBarColor
              }}
            ></span>
          </div>
          <div>100%</div>
        </div>
      </div>
    </div>
  );
};

CoaProjectProgressPill.propTypes = {
  indicator: PropTypes.string,
  total: PropTypes.number,
  current: PropTypes.number,
  startBarContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  endBarContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  progressBarColor: PropTypes.string,
  barColor: PropTypes.string
};

CoaProjectProgressPill.defaultProps = {
  indicator: undefined,
  total: 0,
  current: 0,
  startBarContent: undefined,
  endBarContent: undefined,
  progressBarColor: 'black',
  barColor: 'white'
};
