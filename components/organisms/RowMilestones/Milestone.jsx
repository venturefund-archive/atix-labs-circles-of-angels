import React from 'react';
import PropTypes from 'prop-types';
import MilestoneRow from './MilestoneRow';
import MilestoneCol from './MilestoneCol';
import RowLabel from './RowLabel';
import Info from './Info';
import MilestoneActions from './MilestoneActions';
import MilestoneTasks from './MilestoneTasks';

const Milestone = ({ milestone, index }) => (
  <div>
    <MilestoneRow>
      <MilestoneCol span={3}>
        <h3>Milestone {index}</h3>
      </MilestoneCol>
      <MilestoneCol className="vertical" span={4}>
        <RowLabel text="Quarter" />
        <Info text={milestone.quarter} />
      </MilestoneCol>
      <MilestoneCol span={9}>
        <RowLabel text="Tasks" />
        <Info text={milestone.description} />
      </MilestoneCol>
    </MilestoneRow>
    <MilestoneActions />
    <MilestoneTasks tasks={milestone.tasks} />
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
  index: PropTypes.number.isRequired
};

export default Milestone;
