import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import RowLabel from './RowLabel';
import EditableInfo from './EditableInfo';
import TaskActions from './TaskActions';
import { showModalConfirm } from '../../utils/Modals';

// TODO: define what task fields to show, schema changed
const TaskRow = ({
  task,
  index,
  onDelete,
  onEdit,
  showDelete,
  showEdit,
  showAddEvidence,
  taskActionType
}) => {
  const [editFields, setEditFields] = useState(task);
  const [editing, setEditing] = useState(false);

  const deleteTask = () =>
    showModalConfirm(
      'Attention!',
      'Are you sure you want to delete this task?',
      () => onDelete(task.id, index)
    );

  const handleEditRow = save => {
    if (!editing) return setEditing(true);
    setEditing(false);
    return save === true ? onEdit(editFields, index) : undefined;
  };

  return (
    <Col span={24} key={task.id}>
      <Col
        className="gutter-row TableActivities"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={24}
        lg={{ span: 24 }}
      >
        <Col
          className="gutter-row "
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={3}
          lg={{ span: 3 }}
        >
          <h3>Activity {index}</h3>
        </Col>
        <Col
          className="gutter-row vertical"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={3}
          lg={{ span: 12 }}
        >
          <RowLabel text="Assigned Oracle" />
          <EditableInfo // I think this should be a Select
            value={task.oracle}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, oracle: v })}
          />
        </Col>
        <Col
          className="gutter-row "
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={9}
          lg={{ span: 12 }}
        >
          <RowLabel text="Task" />
          <EditableInfo
            value={task.description}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, description: v })}
          />
        </Col>
        <Col
          className="gutter-row "
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={9}
          lg={{ span: 12 }}
        >
          <RowLabel text="Social Impacts Targets" />
          <EditableInfo
            value={task.impact}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, impact: v })}
          />
        </Col>
        <Col
          className="gutter-row "
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={9}
          lg={{ span: 12 }}
        >
          <RowLabel text="Review Criterion" />
          <EditableInfo
            value={task.reviewCriteria}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, review: v })}
          />
        </Col>
      </Col>
      {(showDelete || showEdit) && (
        <TaskActions
          onDelete={deleteTask}
          onEdit={handleEditRow}
          showDelete={showDelete}
          showEdit={showEdit}
          isEditing={editing}
          showAddEvidence={showAddEvidence}
          type={taskActionType}
        />
      )}
    </Col>
  );
};

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    oracle: PropTypes.string,
    description: PropTypes.string,
    impact: PropTypes.string,
    reviewCriteria: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  showEdit: PropTypes.bool.isRequired,
  showAddEvidence: PropTypes.bool.isRequired,
  taskActionType: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired
};

export default TaskRow;
