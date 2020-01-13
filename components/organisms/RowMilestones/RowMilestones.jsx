import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, message } from 'antd';
import './_style.scss';
import Milestone from './Milestone';

const RowMilestones = ({
  milestones,
  milestoneActionType,
  onTaskDelete,
  onTaskEdit,
  showTaskDelete,
  showTaskEdit,
  onMilestoneDelete,
  onMilestoneEdit,
  showMilestoneDelete,
  showMilestoneEdit
}) => {
  const [toEditMilestones, setToEditMilestones] = useState(milestones);

  const handleDelete = async (value, index) => {
    const wasDeleted = await onMilestoneDelete(value);

    if (wasDeleted) {
      const tempMilestones = [...toEditMilestones];
      tempMilestones.splice(index, 1);
      setToEditMilestones(tempMilestones);
    } else {
      message.error('An error occurred while deleting the record');
    }
  };

  const handleEdit = async (value, index) => {
    const wasEdited = await onMilestoneEdit(value);

    if (wasEdited) {
      const tempMilestones = [...toEditMilestones];
      tempMilestones[index] = value;
      setToEditMilestones(tempMilestones);
    } else {
      message.error('An error occurred while editing the record');
    }
  };

  if (!milestones) return null;
  const milestoneElements = toEditMilestones.map((m, i) => (
    <Milestone
      milestone={m}
      index={i}
      key={m.id}
      milestoneActionType={milestoneActionType}
      milestoneProgress={30} // TODO: where do we get this from?
      milestoneStatus={2} // TODO: where do we get this from?
      onTaskDelete={onTaskDelete}
      onTaskEdit={onTaskEdit}
      showTaskDelete={showTaskDelete}
      showTaskEdit={showTaskEdit}
      onMilestoneDelete={handleDelete}
      onMilestoneEdit={handleEdit}
      showMilestoneDelete={showMilestoneDelete}
      showMilestoneEdit={showMilestoneEdit}
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
  showTaskDelete: false,
  showTaskEdit: false,
  onMilestoneDelete: undefined,
  onMilestoneEdit: undefined,
  showMilestoneDelete: false,
  showMilestoneEdit: false
};

RowMilestones.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  milestoneActionType: PropTypes.string,
  onTaskDelete: PropTypes.func,
  onTaskEdit: PropTypes.func,
  showTaskDelete: PropTypes.bool,
  showTaskEdit: PropTypes.bool,
  onMilestoneDelete: PropTypes.func,
  onMilestoneEdit: PropTypes.func,
  showMilestoneDelete: PropTypes.bool,
  showMilestoneEdit: PropTypes.bool
};

export default RowMilestones;
