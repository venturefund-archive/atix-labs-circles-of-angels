/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

// TODO: <a> elements should be replaced by buttons with link style

const EditTaskActions = ({
  onEdit,
  onDelete,
  showEdit,
  showDelete,
  isEditing
}) => (
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
  </span>
);

EditTaskActions.defaultProps = {
  showEdit: false,
  showDelete: false,
  isEditing: false
};

EditTaskActions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  isEditing: PropTypes.bool
};

export default EditTaskActions;
