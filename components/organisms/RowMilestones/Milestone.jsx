import React from 'react';
import PropTypes from 'prop-types';
import MilestoneRow from './MilestoneRow';
import MilestoneCol from './MilestoneCol';
import RowLabel from './RowLabel';
import Info from './Info';
import MilestoneActions from './MilestoneActions';
import MilestoneTasks from './MilestoneTasks';

// TODO: define what milestone fields to show, schema changed
const Milestone = ({
  milestone,
  index,
  showMilestoneStatus,
  milestoneProgress,
  milestoneStatus,
  onTaskDelete,
  onTaskEdit,
  showTaskDelete,
  showTaskEdit
}) => (
  <div>
    <MilestoneRow>
      <MilestoneCol span={3}>
        <h3>Milestone {index}</h3>
      </MilestoneCol>
      <MilestoneCol className="vertical" span={4}>
        <RowLabel text="Quarter" />
        <Info value={milestone.quarter} />
      </MilestoneCol>
      <MilestoneCol span={9}>
        <RowLabel text="Tasks" />
        <Info value={milestone.description} />
      </MilestoneCol>
    </MilestoneRow>
    <MilestoneActions
      show={showMilestoneStatus}
      status={milestoneStatus}
      progress={milestoneProgress}
    />
    <MilestoneTasks
      tasks={milestone.tasks}
      onDelete={onTaskDelete}
      onEdit={onTaskEdit}
      showDelete={showTaskDelete}
      showEdit={showTaskEdit}
    />
  </div>
);

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
  showMilestoneStatus: PropTypes.bool.isRequired,
  milestoneProgress: PropTypes.number.isRequired,
  milestoneStatus: PropTypes.string.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  showTaskDelete: PropTypes.bool.isRequired,
  showTaskEdit: PropTypes.bool.isRequired
};

export default Milestone;
