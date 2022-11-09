import React from 'react';
import PropTypes from 'prop-types';

import BlockIcon from '../../atoms/BlockIcon/BlockIcon';
import './_style.scss';

const ProjectStatus = ({ status }) => (
  <div className={`status ${status}`}>
    <span>
      {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
    </span>
    <BlockIcon url='/' />
  </div>
);

export default ProjectStatus;

ProjectStatus.propTypes = {
  status: PropTypes.string.isRequired,
}
