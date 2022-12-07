import React from 'react';
import PropTypes from 'prop-types';

import './_style.scss';

const ProjectHeroDetail = ({ icon, text, title }) => (
  <div className="a-projectHeroDetail">
    <div className="a-projectHeroDetail__icon">
      <img width={22} height={22} src={icon} alt="icon" />
    </div>
    <div className="a-projectHeroDetail__text">
      <p>{text}</p>
      <h3>{title}</h3>
    </div>
  </div>
);

export default ProjectHeroDetail;

ProjectHeroDetail.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
