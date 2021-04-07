import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'antd';
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
  <div className="flex">
    <div className="flex">
      {showEdit &&
        (isEditing ? (
          <div className="isEditing">
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
          </div>
        ) : (
          <div>
            <Button
              type="link"
              className="blueLink"
              onClick={() => onEdit(false)}
            >
              Edit
            </Button>
          </div>
        ))}
      {showDelete && showEdit}
      {showCreateTask && (
        <div>
          <Button type="link" className="blueLink" onClick={onClickCreateTask}>
            + New Activity
          </Button>
        </div>
      )}
    </div>
    {showDelete && (
      <div>
        <Button type="link" className="redLink" onClick={onDelete}>
          Delete
        </Button>
      </div>
    )}
  </div>
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
  isEditing,
  allowClaimMilestone
}) => {
  const claimMilestoneStatusMap = {
    [claimMilestoneStatus.PENDING]: {
      text: 'Pending',
      theme: 'CancelMst',
      color: 'orange'
    },
    [claimMilestoneStatus.CLAIMABLE]: {
      text: 'Claimable',
      theme: 'SuccessMst',
      color: 'green',
      onClick: () => onClaimMilestone(milestoneId)
    },
    [claimMilestoneStatus.CLAIMED]: {
      text: 'Claimed',
      theme: 'SuccessMst',
      color: 'blue'
    },
    [claimMilestoneStatus.TRANSFERRED]: {
      text: 'Transferred',
      theme: 'SuccessMst',
      color: 'geekblue'
    }
  };

  const claimMilestoneProps = claimMilestoneStatusMap[status];

  return (
    <Col className="WrapperActions flex space-between">
      {type === 'status' &&
        MilestoneClaimStatus(
          claimMilestoneProps,
          showClaimStatus,
          progress,
          allowClaimMilestone
        )}
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
  isEditing: PropTypes.bool.isRequired,
  allowClaimMilestone: PropTypes.bool.isRequired
};
