import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MilestoneRow from './MilestoneRow';
import MilestoneCol from './MilestoneCol';
import RowLabel from './RowLabel';
import MilestoneActions from './MilestoneActions';
import MilestoneTasks from './MilestoneTasks';
import EditableInfo from './EditableInfo';
import { showModalConfirm } from '../../utils/Modals';
import CreateActivityContainer from '../CreateActivityContainer/CreateActivityContainer';

// TODO: define what milestone fields to show, schema changed
const Milestone = ({
  milestone,
  index,
  milestoneProgress,
  milestoneStatus,
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
  milestoneActionType,
  taskActionType,
  showTaskAddEvidence
}) => {
  const [editFields, setEditFields] = useState(milestone);
  const [editing, setEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteMilestone = () =>
    showModalConfirm(
      'Attention!',
      'Are you sure you want to delete this milestone?',
      () => onMilestoneDelete(milestone.id, index)
    );

  const handleEditRow = save => {
    if (!editing) return setEditing(true);
    setEditing(false);
    return save === true ? onMilestoneEdit(editFields, index) : undefined;
  };

  return (
    <div>
      <MilestoneRow>
        <MilestoneCol span={3}>
          <h3>Milestone {index}</h3>
        </MilestoneCol>
        <MilestoneCol className="vertical" span={4}>
          <RowLabel text="Quarter" />
          <EditableInfo
            value={milestone.quarter}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, quarter: v })}
          />
        </MilestoneCol>
        <MilestoneCol span={9}>
          <RowLabel text="Tasks" />
          <EditableInfo
            value={milestone.description}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, description: v })}
          />
        </MilestoneCol>
      </MilestoneRow>
      <MilestoneActions
        type={milestoneActionType}
        status={milestoneStatus}
        progress={milestoneProgress}
        onDelete={deleteMilestone}
        onEdit={handleEditRow}
        onClickCreateTask={() => setModalVisible(true)}
        showDelete={showMilestoneDelete}
        showEdit={showMilestoneEdit}
        showCreateTask={showCreateTask}
        isEditing={editing}
      />
      <MilestoneTasks
        tasks={milestone.tasks}
        onDelete={onTaskDelete}
        onEdit={onTaskEdit}
        showDelete={showTaskDelete}
        showEdit={showTaskEdit}
        taskActionType={taskActionType}
        showAddEvidence={showTaskAddEvidence}
      />
      <CreateActivityContainer
        visibility={modalVisible}
        setVisibility={setModalVisible}
        createActivity={data => onTaskCreate(data)}
      />
    </div>
  );
};

Milestone.propTypes = {
  milestone: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    quarter: PropTypes.number,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        oracle: PropTypes.string,
        description: PropTypes.string,
        impact: PropTypes.string,
        review: PropTypes.string
      })
    )
  }).isRequired,
  index: PropTypes.number.isRequired,
  milestoneProgress: PropTypes.number.isRequired,
  milestoneStatus: PropTypes.string.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onTaskCreate: PropTypes.func.isRequired,
  showTaskDelete: PropTypes.bool.isRequired,
  showTaskEdit: PropTypes.bool.isRequired,
  onMilestoneDelete: PropTypes.func.isRequired,
  onMilestoneEdit: PropTypes.func.isRequired,
  showMilestoneDelete: PropTypes.bool.isRequired,
  showMilestoneEdit: PropTypes.bool.isRequired,
  showCreateTask: PropTypes.bool.isRequired,
  milestoneActionType: PropTypes.oneOf(['status', 'edit', 'none']).isRequired,
  taskActionType: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired,
  showTaskAddEvidence: PropTypes.bool.isRequired
};

export default Milestone;
