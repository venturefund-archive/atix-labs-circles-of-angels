import React from 'react';
import PropTypes from 'prop-types';
import { Col, Collapse } from 'antd';
import TaskRow from './TaskRow';
import { taskPropType, userPropTypes } from '../../../helpers/proptypes';

const { Panel } = Collapse;

const MilestoneTasks = ({
  tasks,
  onDelete,
  onEdit,
  showDelete,
  showEdit,
  taskActionType,
  onOracleAssign,
  canAssignOracle,
  oracles,
  hideOracleColumn,
  allowNewEvidence
}) => {
  const handleDelete = value => onDelete(value);
  const handleEdit = value => onEdit(value);

  const tasksElements = tasks.map((task, i) => (
    <TaskRow
      task={task}
      index={i}
      key={task.id}
      onDelete={handleDelete}
      onEdit={handleEdit}
      showDelete={showDelete}
      showEdit={showEdit}
      taskActionType={taskActionType}
      onOracleAssign={onOracleAssign}
      canAssignOracle={canAssignOracle}
      oracles={oracles}
      hideOracleColumn={hideOracleColumn}
      allowNewEvidence={allowNewEvidence(task)}
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
      <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
        <Panel header="View Activities" key="1">
          <div className="SubWrapperActivities">{tasksElements}</div>
        </Panel>
      </Collapse>
    </Col>
  );
};

MilestoneTasks.defaultProps = {
  tasks: [],
  oracles: [],
  allowNewEvidence: () => undefined
};

MilestoneTasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape(taskPropType)),
  oracles: PropTypes.arrayOf(PropTypes.shape(userPropTypes)),
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onOracleAssign: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  showEdit: PropTypes.bool.isRequired,
  canAssignOracle: PropTypes.bool.isRequired,
  taskActionType: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired,
  hideOracleColumn: PropTypes.bool.isRequired,
  allowNewEvidence: PropTypes.func
};

export default MilestoneTasks;
