import React from 'react';
import './_style.scss';
import { ProgressBar } from 'components/atoms/ProgressBar/ProgressBar';
import { CoaCard } from 'components/atoms/CoaCard/CoaCard';
import PropTypes from 'prop-types';

export const ProjectScope = ({ milestonesProgressPercentage, activityProgressPercentage }) => (
  <CoaCard className="projectScope">
    <h2 className="projectScope__title">Project Scope</h2>
    <div>
      <h3 className="projectScope__subtitle">Milestones Progress</h3>
      <ProgressBar
        currentPercentage={milestonesProgressPercentage}
        progressBarColor="#4C7FF7"
        endLabel={`${milestonesProgressPercentage.toFixed(2)}%`}
      />
    </div>
    <div>
      <h3 className="projectScope__subtitle">Activities Progress</h3>
      <ProgressBar
        currentPercentage={activityProgressPercentage}
        progressBarColor="#4C7FF7"
        endLabel={`${activityProgressPercentage.toFixed(2)}%`}
      />
    </div>
  </CoaCard>
);

ProjectScope.propTypes = {
  milestonesProgressPercentage: PropTypes.number,
  activityProgressPercentage: PropTypes.number
};

ProjectScope.defaultProps = { milestonesProgressPercentage: 0, activityProgressPercentage: 0 };
