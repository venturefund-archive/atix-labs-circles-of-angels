import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import EvidenceTaskActions from '../../molecules/EvidenceTaskActions/EvidenceTaskActions';
import EditTaskActions from '../../molecules/EditTaskButtons/EditTaskActions';

const TaskActions = ({
  showEdit,
  showDelete,
  onEdit,
  onDelete,
  onNewEvidence,
  isEditing,
  showAddEvidence,
  type,
  taskStatusProps,
  fetchEvidences
}) => {
  const [showModalEvidence, setShowModalEvidence] = useState(false);
  const [evidences, setEvidences] = useState([]);

  const handleOpenModalEvidences = async () => {
    const taskEvidences = await fetchEvidences();
    setEvidences(taskEvidences);
    setShowModalEvidence(true);
  };

  const handleCloseModalEvidences = () => {
    setShowModalEvidence(false);
    setEvidences([]);
  };

  return (
    <Col className="WrapperActionsActivities">
      {type === 'evidence' && (
        <EvidenceTaskActions
          {...taskStatusProps}
          showAddEvidence={showAddEvidence}
          onNewEvidence={onNewEvidence}
          showModalEvidence={showModalEvidence}
          evidences={evidences}
          openModalEvidences={handleOpenModalEvidences}
          closeModalEvidences={handleCloseModalEvidences}
        />
      )}
      {type === 'edit' && (
        <EditTaskActions
          onEdit={onEdit}
          onDelete={onDelete}
          showEdit={showEdit}
          showDelete={showDelete}
          isEditing={isEditing}
        />
      )}
    </Col>
  );
};

TaskActions.defaultProps = {
  isEditing: false,
  taskStatusProps: {}
};

TaskActions.propTypes = {
  showEdit: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
  showAddEvidence: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNewEvidence: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired,
  isEditing: PropTypes.bool,
  taskStatusProps: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string
  }),
  fetchEvidences: PropTypes.func.isRequired
};

export default TaskActions;
