/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Divider } from 'antd';

const editTaskButtons = (onEdit, onDelete, showEdit, showDelete, isEditing) => (
  <span>
    {showEdit && (
      <div>
        {isEditing ? (
          <span className="isEditing">
            <a className="blueLink" onClick={() => onEdit(true)}>
              Save
            </a>
            <a className="redLink" onClick={() => onEdit(false)}>
              Cancel
            </a>
          </span>
        ) : (
          <a className="blueLink" onClick={() => onEdit(false)}>
            Edit
          </a>
        )}
        {showDelete && (
          <a className="redLink" onClick={onDelete}>
            Delete
          </a>
        )}
      </div>
    )}
    {showDelete && showEdit}
  </span>
);

const evidenceTask = (showAddEvidence, onNewEvidence) => (
  <Col span={24}>
    <a className="blueLink">Evidences</a>
    {showAddEvidence && (
      <a className="blueLink" onClick={onNewEvidence}>
        +Add Evidence
      </a>
    )}
  </Col>
);

// TODO: <a> elements should be replaced by buttons with link style
const TaskActions = ({
  showEdit,
  showDelete,
  onEdit,
  onDelete,
  onNewEvidence,
  isEditing,
  showAddEvidence,
  type
}) => (
  <Col
    className="WrapperActionsActivities"
  >
    {type === 'evidence' && evidenceTask(showAddEvidence, onNewEvidence)}
    {type === 'edit' &&
      editTaskButtons(onEdit, onDelete, showEdit, showDelete, isEditing)}
  </Col>
);

TaskActions.defaultProps = {
  isEditing: false
};

TaskActions.propTypes = {
  showEdit: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
  showAddEvidence: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNewEvidence: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired,
  isEditing: PropTypes.bool
};

export default TaskActions;
