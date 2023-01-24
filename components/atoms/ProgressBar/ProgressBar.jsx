import React from 'react';
import './_style.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ProgressBar = ({
  initialLabel,
  endLabel,
  backgroundBarColor,
  progressBarColor,
  currentPercentage,
  className
}) => (
  <div className={classNames('progressBar', className)}>
    {initialLabel ? (
      <div className="progressBar__text progressBar__initialLabel">{initialLabel}</div>
    ) : null}
    <div className="progressBar__bar" style={{ '--barColor': backgroundBarColor }}>
      <span
        className="progressBar__bar__fill"
        style={{
          '--currentPercentage': `${currentPercentage}%`,
          '--progressBarColor': progressBarColor
        }}
      ></span>
    </div>
    {endLabel ? <div className="progressBar__text progressBar__endLabel">{endLabel}</div> : null}
  </div>
);

ProgressBar.propTypes = {
  initialLabel: PropTypes.string,
  endLabel: PropTypes.string,
  backgroundBarColor: PropTypes.string,
  progressBarColor: PropTypes.string,
  className: PropTypes.string,
  currentPercentage: PropTypes.number
};

ProgressBar.defaultProps = {
  initialLabel: '',
  endLabel: '',
  backgroundBarColor: '',
  progressBarColor: '',
  className: '',
  currentPercentage: 0
};
