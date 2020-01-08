import React from 'react';
import PropTypes from 'prop-types';
import { Col, Divider } from 'antd';

// TODO: <a> elements should be replaced by buttons with link style
const TaskActions = ({ showEdit, showDelete, onEdit, onDelete, isEditing }) => (
  <Col
    className="WrapperActionsActivities"
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={2}
    lg={{ span: 3 }}
  >
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
  </Col>
);

TaskActions.defaultProps = {
  isEditing: false
};

TaskActions.propTypes = {
  showEdit: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
};

export default TaskActions;
