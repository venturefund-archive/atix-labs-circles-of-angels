import React from 'react';
import PropTypes from 'prop-types';
import { Col, Collapse } from 'antd';
import TaskRow from './TaskRow';

const { Panel } = Collapse;

const MilestoneTasks = ({
  tasks,
  onDelete,
  onEdit,
  showDelete,
  showEdit,
  showAddEvidence,
  taskActionType
}) => {
  const handleDelete = value => onDelete(value);
  const handleEdit = value => onEdit(value);

  const tasksElements = tasks.map((task, i) => (
    <TaskRow
      task={task}
      index={i}
      onDelete={handleDelete}
      onEdit={handleEdit}
      showDelete={showDelete}
      showEdit={showEdit}
      showAddEvidence={showAddEvidence}
      taskActionType={taskActionType}
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
  showEdit: PropTypes.bool.isRequired,
  taskActionType: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired,
  showAddEvidence: PropTypes.bool.isRequired
};

export default MilestoneTasks;
