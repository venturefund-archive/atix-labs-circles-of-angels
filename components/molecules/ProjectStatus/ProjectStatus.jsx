import React from 'react';
import PropTypes from 'prop-types';

import './_style.scss';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { PROJECT_STATUS_ENUM, PROJECT_STATUS_MAP } from 'model/projectStatus';
import BlockIcon from '../../atoms/BlockIcon/BlockIcon';

const ProjectStatus = ({ status, blockchainHistoryUrl, isAdmin }) => (
  <div className={`status ${status}`}>
    <CoaTag predefinedColor={PROJECT_STATUS_MAP[status?.toLowerCase()]?.color}>
      {PROJECT_STATUS_MAP?.[status]?.name}
    </CoaTag>
    {(status !== PROJECT_STATUS_ENUM.DRAFT || isAdmin) && <BlockIcon url={blockchainHistoryUrl} />}
  </div>
);

export default ProjectStatus;

ProjectStatus.defaultProps = {
  blockchainHistoryUrl: undefined
};

ProjectStatus.propTypes = {
  status: PropTypes.string.isRequired,
  blockchainHistoryUrl: PropTypes.string
};
