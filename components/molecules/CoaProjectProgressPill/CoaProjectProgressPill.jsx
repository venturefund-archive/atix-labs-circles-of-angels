import React from 'react';
import './coa-project-progress-pill.scss';

export const CoaProjectProgressPill = ({
  indicator,
  total,
  current,
  startBarContent,
  endBarContent,
  progressBarColor,
  barColor
}) => {
  const currentPercent = (current / total) * 100;
  return (
    <div className="m-coaProjectProgressPill">
      <h3 className="m-coaProjectProgressPill__indicator">{indicator}</h3>
      <div className="m-coaProjectProgressPill__progress">
        <div className="m-coaProjectProgressPill__progress__texts">
          <div>{startBarContent}</div>
          <div>{endBarContent}</div>
        </div>
        <div className="m-coaProjectProgressPill__progress__barContainer">
          <div>{currentPercent}%</div>
          <div className="m-coaProjectProgressPill__bar" style={{ '--barColor': barColor }}>
            <span
              className="m-coaProjectProgressPill__bar__fill"
              style={{
                '--currentPercent': `${currentPercent}%`,
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
