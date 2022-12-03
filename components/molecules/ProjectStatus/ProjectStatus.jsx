import React from 'react';
import PropTypes from 'prop-types';

import './_style.scss';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import projectStatusMap from 'model/projectStatus';
import BlockIcon from '../../atoms/BlockIcon/BlockIcon';

const ProjectStatus = ({ status }) => (
  <div className={`status ${status}`}>
    <CoaTag predefinedColor={projectStatusMap[status?.toLowerCase()]?.color}>
      {projectStatusMap?.[status]?.name}
    </CoaTag>
    <BlockIcon url="/" />
  </div>
);

export default ProjectStatus;

ProjectStatus.propTypes = {
  status: PropTypes.string.isRequired
};
