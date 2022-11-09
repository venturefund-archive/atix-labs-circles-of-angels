import React from 'react';
import PropTypes from 'prop-types';

import './_style.scss';

const ProjectHeroDetail = ({ icon, text, title }) => (
  <div className='detail'>
    <div className='icon'>
      <img width={22} height={22} src={icon} alt="icon"/>
    </div>
    <div className='text'>
      <p>{text}</p>
      <h1>{title}</h1>
    </div>
  </div>
);

export default ProjectHeroDetail;

ProjectHeroDetail.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}
