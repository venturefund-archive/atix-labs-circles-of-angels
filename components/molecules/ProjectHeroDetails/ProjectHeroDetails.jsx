import React from 'react';
import PropTypes from 'prop-types';

import ProjectHeroDetail from '../../atoms/ProjectHeroDetail/ProjectHeroDetail';
import './_style.scss';

const ProjectHeroDetails = ({ country, timeframe, budget, beneficiary }) => (
  <div className="details">
    <ProjectHeroDetail text='Country of Impact' icon='/static/images/globe.svg' title={country} />
    <ProjectHeroDetail text='Timeframe' icon='/static/images/calendar.svg' title={timeframe} />
    <ProjectHeroDetail text='Budget' icon='/static/images/coin.svg' title={budget} />
    <ProjectHeroDetail text='Beneficiary name' icon='/static/images/arrow.svg' title={beneficiary} />
  </div>
);

export default ProjectHeroDetails;

ProjectHeroDetails.propTypes = {
    country: PropTypes.string.isRequired,
    timeframe: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
    beneficiary: PropTypes.string.isRequired,
}
