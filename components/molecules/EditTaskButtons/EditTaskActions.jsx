import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

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
            <Button
              type="link"
              className="blueLink"
              onClick={() => onEdit(true)}
            >
              Save
            </Button>
            <Button
              type="link"
              className="redLink"
              onClick={() => onEdit(false)}
            >
              Cancel
            </Button>
          </span>
        ) : (
          <Button
            type="link"
            className="blueLink"
            onClick={() => onEdit(false)}
          >
            Edit
          </Button>
        )}
        {showDelete && (
          <Button type="link" className="redLink" onClick={onDelete}>
            Delete
          </Button>
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
