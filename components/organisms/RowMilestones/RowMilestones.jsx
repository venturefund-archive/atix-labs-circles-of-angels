import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import './_style.scss';
import Milestone from './Milestone';
import { milestonePropType, userPropTypes } from '../../../helpers/proptypes';

const RowMilestones = ({
  milestones,
  milestoneActionType,
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
  showClaimStatus,
  taskActionType,
  oracles,
  hideOracleColumn,
  allowNewEvidence
}) => {
  const handleTaskCreate = (milestoneId, taskData) =>
    onTaskCreate(milestoneId, taskData);
  const handleDelete = value => onMilestoneDelete(value);
  const handleEdit = value => onMilestoneEdit(value);

  if (!milestones) return null;
  const milestoneElements = milestones.map((milestone, index) => (
    <Milestone
      milestone={milestone}
      index={index}
      key={milestone.id}
      milestoneActionType={milestoneActionType}
      milestoneProgress={30} // TODO: where do we get this from?
      milestoneStatus={milestone.claimStatus}
      onTaskDelete={onTaskDelete}
      onTaskEdit={onTaskEdit}
      onTaskCreate={taskData => handleTaskCreate(milestone.id, taskData)}
      onOracleAssign={onOracleAssign}
      onClaimMilestone={onClaimMilestone}
      showTaskDelete={showTaskDelete}
      showTaskEdit={showTaskEdit}
      canAssignOracle={canAssignOracle}
      onMilestoneDelete={handleDelete}
      onMilestoneEdit={handleEdit}
      showMilestoneDelete={showMilestoneDelete}
      showMilestoneEdit={showMilestoneEdit}
      showClaimStatus={showClaimStatus}
      showCreateTask={showCreateTask}
      taskActionType={taskActionType}
      oracles={oracles}
      hideOracleColumn={hideOracleColumn}
      allowNewEvidence={allowNewEvidence}
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
  oracles: [],
  milestoneActionType: 'none',
  onTaskDelete: undefined,
  onTaskEdit: undefined,
  onTaskCreate: undefined,
  onOracleAssign: undefined,
  showTaskDelete: false,
  showTaskEdit: false,
  onMilestoneDelete: undefined,
  onMilestoneEdit: undefined,
  showMilestoneDelete: false,
  showMilestoneEdit: false,
  showCreateTask: false,
  showClaimStatus: false,
  canAssignOracle: false,
  taskActionType: 'none',
  hideOracleColumn: false,
  allowNewEvidence: () => undefined,
  onClaimMilestone: () => undefined
};

RowMilestones.propTypes = {
  milestones: PropTypes.arrayOf(PropTypes.shape(milestonePropType)),
  oracles: PropTypes.arrayOf(PropTypes.shape(userPropTypes)),
  milestoneActionType: PropTypes.oneOf(['status', 'edit', 'none']),
  onTaskDelete: PropTypes.func,
  onTaskEdit: PropTypes.func,
  onTaskCreate: PropTypes.func,
  onOracleAssign: PropTypes.func,
  showTaskDelete: PropTypes.bool,
  showTaskEdit: PropTypes.bool,
  onMilestoneDelete: PropTypes.func,
  onMilestoneEdit: PropTypes.func,
  onClaimMilestone: PropTypes.func,
  showMilestoneDelete: PropTypes.bool,
  showMilestoneEdit: PropTypes.bool,
  showCreateTask: PropTypes.bool,
  showClaimStatus: PropTypes.bool,
  canAssignOracle: PropTypes.bool,
  taskActionType: PropTypes.oneOf(['evidence', 'edit', 'none']),
  hideOracleColumn: PropTypes.bool,
  allowNewEvidence: PropTypes.func
};

export default RowMilestones;
