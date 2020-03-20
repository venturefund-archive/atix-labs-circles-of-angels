/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Tag } from 'antd';
import ModalEvidences from '../ModalEvidences/ModalEvidences';
import { tagPropTypes } from '../../../helpers/proptypes';

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

const evidenceTask = ({ color, text }, showAddEvidence, onNewEvidence) => (
  <Col span={24}>
    <Tag color={color}>{text}</Tag>
    <ModalEvidences />
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
  type,
  taskStatusProps
}) => (
  <Col className="WrapperActionsActivities">
    {type === 'evidence' &&
      evidenceTask(taskStatusProps, showAddEvidence, onNewEvidence)}
    {type === 'edit' &&
      editTaskButtons(onEdit, onDelete, showEdit, showDelete, isEditing)}
  </Col>
);

evidenceTask.defaultProps = {
  text: undefined,
  color: undefined
};

evidenceTask.propTypes = tagPropTypes;

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
  })
};

export default TaskActions;
