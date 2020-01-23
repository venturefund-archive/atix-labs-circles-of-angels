import React from 'react';
import PropTypes from 'prop-types';
import { Col, Progress, Tag, Divider } from 'antd';
import MilestoneBudgetStatus from '../../../constants/MilestoneBudgetStatus';
import CustomButton from '../../atoms/CustomButton/CustomButton';

// TODO: this is an example on how implement this with the old schema
//       but the budget status property doesn't exist anymore
const statusTagMap = {
  [MilestoneBudgetStatus.CLAIMABLE]: {
    tagColor: '#27AE60',
    tagText: 'Claimable!'
  },
  [MilestoneBudgetStatus.CLAIMED]: {
    tagColor: '#27AE60',
    tagText: 'Claimed!'
  },
  [MilestoneBudgetStatus.FUNDED]: {
    tagColor: '#27AE60',
    tagText: 'Funded!'
  },
  [MilestoneBudgetStatus.BLOCKED]: {
    tagColor: '#27AE60',
    tagText: 'Blocked!'
  }
};

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

const statusMilestone = (tagColor, tagText, progress) => (
  <div className="space-between w100">
    {tagColor && tagText && <Tag color={tagColor}>{tagText}</Tag>}
    <div style={{ width: 120 }}>
      <Progress percent={progress} />
    </div>
  </div>
);

const MilestoneActions = ({
  type,
  onEdit,
  onDelete,
  onClickCreateTask,
  showEdit,
  showDelete,
  showCreateTask,
  status,
  progress,
  isEditing
}) => {
  // any defaults? or just don't show the tag if no mapping defined?
  const tagColor = statusTagMap[status]
    ? statusTagMap[status].tagColor
    : undefined;
  const tagText = statusTagMap[status]
    ? statusTagMap[status].tagText
    : undefined;

  return (
    <Col
      className="WrapperActions flex space-between"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={6}
      lg={{ span: 6 }}
    >
      {type === 'status' && statusMilestone(tagColor, tagText, progress)}
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

MilestoneActions.propTypes = {
  status: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClickCreateTask: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  showEdit: PropTypes.bool.isRequired,
  showCreateTask: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['status', 'edit', 'none']).isRequired,
  isEditing: PropTypes.bool.isRequired
};

export default MilestoneActions;
