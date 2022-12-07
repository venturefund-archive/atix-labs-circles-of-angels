import React from 'react';
import PropTypes from 'prop-types';

import { Divider } from 'antd';
import ProjectHeroDetail from '../../atoms/ProjectHeroDetail/ProjectHeroDetail';
import './_style.scss';

const ProjectHeroDetails = ({ country, timeframe, budget, beneficiary }) => (
  <div className="m-projectHeroDetails">
    <ProjectHeroDetail text="Country of Impact" icon="/static/images/globe.svg" title={country} />
    <Divider type="vertical" className="m-projectHeroDetails__divider" />
    <ProjectHeroDetail text="Timeframe" icon="/static/images/calendar.svg" title={timeframe} />
    <Divider type="vertical" className="m-projectHeroDetails__divider" />
    <ProjectHeroDetail text="Budget" icon="/static/images/coin.svg" title={budget} />
    <Divider type="vertical" className="m-projectHeroDetails__divider" />
    <ProjectHeroDetail
      text="Beneficiary name"
      icon="/static/images/arrow.svg"
      title={beneficiary}
    />
  </div>
);

export default ProjectHeroDetails;

ProjectHeroDetails.propTypes = {
  country: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  beneficiary: PropTypes.string.isRequired
};
