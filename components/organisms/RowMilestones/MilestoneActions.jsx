/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Progress } from 'antd';
import { claimMilestoneStatus } from '../../../constants/constants';
import CustomButton from '../../atoms/CustomButton/CustomButton';

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
            <a className="blueLink" onClick={() => onEdit(true)}>
              Save
            </a>
            <a className="redLink" onClick={() => onEdit(false)}>
              Cancel
            </a>
          </div>
        ) : (
          <div>
            <a className="blueLink" onClick={() => onEdit(false)}>
              Edit
            </a>
          </div>
        ))}
      {showDelete && showEdit}
      {showCreateTask && (
        <div>
          <a className="blueLink" onClick={onClickCreateTask}>
            + New Task
          </a>
        </div>
      )}
    </div>
    {showDelete && (
      <div>
        <a className="redLink" onClick={onDelete}>
          Delete
        </a>
      </div>
    )}
  </div>
);

const statusMilestone = (text, onClick, progress, theme) => (
  <div className="space-between">
    <div style={{ width: 120 }}>
      <Progress percent={progress} />
    </div>
    <CustomButton theme={theme} onClick={onClick} buttonText={text} />
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
  status,
  progress,
  isEditing
}) => {
  const claimMilestoneStatusMap = {
    [claimMilestoneStatus.PENDING]: {
      text: 'Claimable!',
      theme: 'CancelMst'
    },
    [claimMilestoneStatus.CLAIMABLE]: {
      text: 'Claimable!',
      theme: 'SuccessMst',
      onClick: () => onClaimMilestone(milestoneId)
    },
    [claimMilestoneStatus.CLAIMED]: {
      text: 'Claimed',
      theme: 'SuccessMst'
    },
    [claimMilestoneStatus.TRANSFERRED]: {
      text: 'Transferred',
      theme: 'SuccessMst'
    }
  };

  const { text, onClick, theme } = claimMilestoneStatusMap[status];

  return (
    <Col className="WrapperActions flex space-between">
      {type === 'status' && statusMilestone(text, onClick, progress, theme)}
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
  onClaimMilestone: () => undefined
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
  type: PropTypes.oneOf(['status', 'edit', 'none']).isRequired,
  isEditing: PropTypes.bool.isRequired
};
