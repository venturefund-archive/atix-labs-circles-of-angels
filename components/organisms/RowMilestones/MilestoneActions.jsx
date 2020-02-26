import React from 'react';
import PropTypes from 'prop-types';
import { Col, Divider } from 'antd';
import { claimMilestoneStatus } from '../../../constants/constants';
import MilestoneClaimStatus from './MilestoneClaimStatus';

const editMilestoneButtons = (
  onEdit,
  onDelete,
  onClickCreateTask,
  showEdit,
  showDelete,
  showCreateTask,
  isEditing
) => (
  <Col span={24} className="flex">
    <Col span={18} className="flex">
      {showEdit &&
        (isEditing ? (
          <Col span={10}>
            <a className="blueLink" onClick={() => onEdit(true)}>
              Save
            </a>
            <Divider />
            <a className="blueLink" onClick={() => onEdit(false)}>
              Cancel
            </a>
          </Col>
        ) : (
          <Col span={10}>
            <a className="blueLink" onClick={() => onEdit(false)}>
              Edit
            </a>
          </Col>
        ))}
      {showDelete && showEdit}
      {showCreateTask && (
        <Col span={13}>
          <a className="blueLink" onClick={onClickCreateTask}>
            + New Task
          </a>
        </Col>
      )}
    </Col>
    {showDelete && (
      <Col span={6}>
        <a className="redLink" onClick={onDelete}>
          Delete
        </a>
      </Col>
    )}
  </Col>
);

const MilestoneActions = ({
  type,
  milestoneId,
  onEdit,
  onDelete,
  onClickCreateTask,
  onClaimMilestone,
  showEdit,
  showDelete,
  showCreateTask,
  showClaimStatus,
  status,
  progress,
  isEditing
}) => {
  const claimMilestoneStatusMap = {
    [claimMilestoneStatus.PENDING]: {
      text: 'Pending',
      color: 'yellow'
    },
    [claimMilestoneStatus.CLAIMABLE]: {
      text: 'Claimable',
      color: 'blue',
      onClick: () => onClaimMilestone(milestoneId)
    },
    [claimMilestoneStatus.CLAIMED]: {
      text: 'Claimed',
      color: 'green'
    },
    [claimMilestoneStatus.TRANSFERRED]: {
      text: 'Transferred',
      color: 'gold'
    }
  };

  const claimMilestoneProps = claimMilestoneStatusMap[status];

  return (
    <Col
      className="WrapperActions flex space-between"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={6}
      lg={{ span: 6 }}
    >
      {type === 'status' &&
        MilestoneClaimStatus(claimMilestoneProps, showClaimStatus, progress)}
      {type === 'edit' &&
        editMilestoneButtons(
          onEdit,
          onDelete,
          onClickCreateTask,
          showEdit,
          showDelete,
          showCreateTask,
          isEditing
        )}
    </Col>
  );
};

export default MilestoneActions;

MilestoneActions.defaultProps = {
  onClaimMilestone: () => undefined,
  showClaimStatus: false
};

MilestoneActions.propTypes = {
  milestoneId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClickCreateTask: PropTypes.func.isRequired,
  onClaimMilestone: PropTypes.func,
  showDelete: PropTypes.bool.isRequired,
  showEdit: PropTypes.bool.isRequired,
  showCreateTask: PropTypes.bool.isRequired,
  showClaimStatus: PropTypes.bool,
  type: PropTypes.oneOf(['status', 'edit', 'none']).isRequired,
  isEditing: PropTypes.bool.isRequired
};
