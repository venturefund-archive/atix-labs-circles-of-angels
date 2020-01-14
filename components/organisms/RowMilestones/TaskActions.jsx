import React from 'react';
import PropTypes from 'prop-types';
import { Col, Divider } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const editTaskButtons = (onEdit, onDelete, showEdit, showDelete, isEditing) => (
  <span>
    {showEdit && (
      <Col span={24}>
        {isEditing ? (
          <span>
            <a className="blueLink" onClick={() => onEdit(true)}>
              Save
            </a>
            <a className="blueLink" onClick={() => onEdit(false)}>
              Cancel
            </a>
          </span>
        ) : (
          <a className="blueLink" onClick={() => onEdit(false)}>
            Edit
          </a>
        )}
      </Col>
    )}
    {showDelete && showEdit && <Divider />}
    {showDelete && (
      <Col span={24}>
        <a className="redLink" onClick={onDelete}>
          Delete
        </a>
      </Col>
    )}
  </span>
);

const evidenceTask = showAddEvidence => (
  <Col span={24}>
    <a className="blueLink" onClick={() => console.log('show evidences')}>
      Evidences
    </a>
    {showAddEvidence && (
      <CustomButton
        buttonText="Add Evidence"
        theme="Alternative"
        onClick={() => console.log('adding evidence')}
      />
    )}
  </Col>
);

// TODO: <a> elements should be replaced by buttons with link style
const TaskActions = ({
  showEdit,
  showDelete,
  onEdit,
  onDelete,
  isEditing,
  showAddEvidence,
  type
}) => (
  <Col
    className="WrapperActionsActivities"
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={2}
    lg={{ span: 3 }}
  >
    {type === 'evidence' && evidenceTask(showAddEvidence)}
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
  type: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired,
  isEditing: PropTypes.bool
};

export default TaskActions;
