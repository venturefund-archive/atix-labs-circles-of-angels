import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import './_style.scss';
import Milestone from './Milestone';
import { milestonePropType } from '../../../helpers/proptypes';

const RowMilestones = ({
  milestones,
  milestoneActionType,
  onTaskDelete,
  onTaskEdit,
  onTaskCreate,
  showTaskDelete,
  showTaskEdit,
  onMilestoneDelete,
  onMilestoneEdit,
  showMilestoneDelete,
  showMilestoneEdit,
  showCreateTask,
  showTaskAddEvidence,
  taskActionType
}) => {
  const handleTaskCreate = (milestoneId, taskData) =>
    onTaskCreate(milestoneId, taskData);
  const handleDelete = value => onMilestoneDelete(value);
  const handleEdit = value => onMilestoneEdit(value);

  if (!milestones) return null;
  const milestoneElements = milestones.map((m, i) => (
    <Milestone
      milestone={m}
      index={i}
      key={m.id}
      milestoneActionType={milestoneActionType}
      milestoneProgress={30} // TODO: where do we get this from?
      milestoneStatus={2} // TODO: where do we get this from?
      onTaskDelete={onTaskDelete}
      onTaskEdit={onTaskEdit}
      onTaskCreate={taskData => handleTaskCreate(m.id, taskData)}
      showTaskDelete={showTaskDelete}
      showTaskEdit={showTaskEdit}
      onMilestoneDelete={handleDelete}
      onMilestoneEdit={handleEdit}
      showMilestoneDelete={showMilestoneDelete}
      showMilestoneEdit={showMilestoneEdit}
      showCreateTask={showCreateTask}
      showTaskAddEvidence={showTaskAddEvidence}
      taskActionType={taskActionType}
    />
  ));
  return (
    <div className="MilestonesDetails">
      <Row className="WrapperTable">{milestoneElements}</Row>
    </div>
  );
};

RowMilestones.defaultProps = {
  milestones: [],
  milestoneActionType: 'none',
  onTaskDelete: undefined,
  onTaskEdit: undefined,
  onTaskCreate: undefined,
  showTaskDelete: false,
  showTaskEdit: false,
  onMilestoneDelete: undefined,
  onMilestoneEdit: undefined,
  showMilestoneDelete: false,
  showMilestoneEdit: false,
  showCreateTask: false,
  showTaskAddEvidence: false,
  taskActionType: 'none'
};

RowMilestones.propTypes = {
  milestones: PropTypes.arrayOf(PropTypes.shape(milestonePropType)),
  milestoneActionType: PropTypes.oneOf(['status', 'edit', 'none']),
  onTaskDelete: PropTypes.func,
  onTaskEdit: PropTypes.func,
  onTaskCreate: PropTypes.func,
  showTaskDelete: PropTypes.bool,
  showTaskEdit: PropTypes.bool,
  onMilestoneDelete: PropTypes.func,
  onMilestoneEdit: PropTypes.func,
  showMilestoneDelete: PropTypes.bool,
  showMilestoneEdit: PropTypes.bool,
  showCreateTask: PropTypes.bool,
  showTaskAddEvidence: PropTypes.bool,
  taskActionType: PropTypes.oneOf(['evidence', 'edit', 'none'])
};

export default RowMilestones;
