import React from 'react';
import PropTypes from 'prop-types';

import './_style.scss';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { PROJECT_STATUS_MAP } from 'model/projectStatus';
import BlockIcon from '../../atoms/BlockIcon/BlockIcon';

const ProjectStatus = ({ status }) => (
  <div className={`status ${status}`}>
    <CoaTag predefinedColor={PROJECT_STATUS_MAP[status?.toLowerCase()]?.color}>
      {PROJECT_STATUS_MAP?.[status]?.name}
    </CoaTag>
    <BlockIcon url="/" />
  </div>
);

export default ProjectStatus;

ProjectStatus.propTypes = {
  status: PropTypes.string.isRequired
};
