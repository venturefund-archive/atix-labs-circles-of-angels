import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Collapse, message } from 'antd';
import TaskRow from './TaskRow';

const { Panel } = Collapse;

const MilestoneTasks = ({ tasks, onDelete, onEdit, showDelete, showEdit }) => {
  const [toEditTasks, setToEditTasks] = useState(tasks);

  const handleDelete = async (value, index) => {
    const wasDeleted = await onDelete(value);

    if (wasDeleted) {
      const tempTasks = [...toEditTasks];
      tempTasks.splice(index, 1);
      setToEditTasks(tempTasks);
    } else {
      message.error('An error occurred while deleting the record');
    }
  };

  const handleEdit = async (value, index) => {
    const wasEdited = await onEdit(value);

    if (wasEdited) {
      const tempTasks = [...toEditTasks];
      tempTasks[index] = value;
      setToEditTasks(tempTasks);
    } else {
      message.error('An error occurred while editing the record');
    }
  };

  const tasksElements = toEditTasks.map((task, i) => (
    <TaskRow
      task={task}
      index={i}
      onDelete={handleDelete}
      onEdit={handleEdit}
      showDelete={showDelete}
      showEdit={showEdit}
    />
  ));
  return (
    <Col
      className="WrapperActivities"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={24}
      lg={{ span: 24 }}
    >
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Activities" key="1">
          <div className="SubWrapperActivities">{tasksElements}</div>
        </Panel>
      </Collapse>
    </Col>
  );
};

MilestoneTasks.defaultProps = {
  tasks: []
};

MilestoneTasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      oracle: PropTypes.string,
      description: PropTypes.string,
      impact: PropTypes.string,
      review: PropTypes.string
    })
  ),
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  showEdit: PropTypes.bool.isRequired
};

export default MilestoneTasks;
