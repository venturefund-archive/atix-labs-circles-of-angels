import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import MilestoneRow from './MilestoneRow';
import MilestoneCol from './MilestoneCol';
import RowLabel from './RowLabel';
import MilestoneActions from './MilestoneActions';
import MilestoneTasks from './MilestoneTasks';
import EditableInfo from './EditableInfo';
import { showModalConfirm } from '../../utils/Modals';
import CreateActivityContainer from '../CreateActivityContainer/CreateActivityContainer';
import { milestonePropType, userPropTypes } from '../../../helpers/proptypes';

// TODO: define what milestone fields to show, schema changed
const Milestone = ({
  milestone,
  index,
  milestoneProgress,
  milestoneStatus,
  onTaskDelete,
  onTaskEdit,
  onTaskCreate,
  onOracleAssign,
  showTaskDelete,
  showTaskEdit,
  canAssignOracle,
  onMilestoneDelete,
  onMilestoneEdit,
  onClaimMilestone,
  showMilestoneDelete,
  showMilestoneEdit,
  showCreateTask,
  milestoneActionType,
  taskActionType,
  oracles,
  hideOracleColumn,
  allowNewEvidence
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
        <div className="header space-between">
          <Col xs={8} lg={12}>
            <h3>Milestone {index}</h3>
          </Col>
          <MilestoneActions
            type={milestoneActionType}
            milestoneId={milestone.id}
            status={milestoneStatus}
            progress={milestoneProgress}
            onDelete={deleteMilestone}
            onEdit={handleEditRow}
            onClickCreateTask={() => setModalVisible(true)}
            onClaimMilestone={onClaimMilestone}
            showDelete={showMilestoneDelete}
            showEdit={showMilestoneEdit}
            showCreateTask={showCreateTask}
            isEditing={editing}
          />
        </div>
        <MilestoneCol className="flex" span={3}>
          <img
            src="/static/images/calendarMilestone.svg"
            alt="chatimage"
            width="35px"
          />
          <div className="vertical">
            <RowLabel text="Quarter" />
            <EditableInfo
              value={milestone.quarter || 'No data'}
              isEditing={editing}
              updateValue={v => setEditFields({ ...editFields, quarter: v })}
            />
          </div>
        </MilestoneCol>
        <MilestoneCol span={20}>
          <RowLabel text="Description" />
          <EditableInfo
            value={milestone.description}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, description: v })}
          />
        </MilestoneCol>
      </MilestoneRow>

      <MilestoneTasks
        tasks={milestone.tasks}
        onDelete={onTaskDelete}
        onEdit={onTaskEdit}
        showDelete={showTaskDelete}
        showEdit={showTaskEdit}
        taskActionType={taskActionType}
        onOracleAssign={onOracleAssign}
        canAssignOracle={canAssignOracle}
        oracles={oracles}
        hideOracleColumn={hideOracleColumn}
        allowNewEvidence={allowNewEvidence}
      />
      <CreateActivityContainer
        visibility={modalVisible}
        setVisibility={setModalVisible}
        createActivity={data => onTaskCreate(data)}
      />
    </div>
  );
};

Milestone.defaultProps = {
  allowNewEvidence: () => undefined,
  onClaimMilestone: () => undefined
};

Milestone.propTypes = {
  milestone: PropTypes.shape(milestonePropType).isRequired,
  oracles: PropTypes.arrayOf(PropTypes.shape(userPropTypes)).isRequired,
  index: PropTypes.number.isRequired,
  milestoneProgress: PropTypes.number.isRequired,
  milestoneStatus: PropTypes.string.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onTaskCreate: PropTypes.func.isRequired,
  onOracleAssign: PropTypes.func.isRequired,
  onClaimMilestone: PropTypes.func,
  showTaskDelete: PropTypes.bool.isRequired,
  showTaskEdit: PropTypes.bool.isRequired,
  onMilestoneDelete: PropTypes.func.isRequired,
  onMilestoneEdit: PropTypes.func.isRequired,
  showMilestoneDelete: PropTypes.bool.isRequired,
  showMilestoneEdit: PropTypes.bool.isRequired,
  showCreateTask: PropTypes.bool.isRequired,
  canAssignOracle: PropTypes.bool.isRequired,
  milestoneActionType: PropTypes.oneOf(['status', 'edit', 'none']).isRequired,
  taskActionType: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired,
  hideOracleColumn: PropTypes.bool.isRequired,
  allowNewEvidence: PropTypes.func
};

export default Milestone;
