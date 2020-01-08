import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import './_style.scss';
import Milestone from './Milestone';

const RowMilestones = ({
  milestones,
  showMilestoneStatus,
  onTaskDelete,
  onTaskEdit,
  showTaskDelete,
  showTaskEdit
}) => {
  if (!milestones) return null;
  const milestoneElements = milestones.map((m, i) => (
    <Milestone
      milestone={m}
      index={i}
      key={m.id}
      showMilestoneStatus={showMilestoneStatus}
      milestoneProgress={30} // TODO: where do we get this from?
      milestoneStatus={2} // TODO: where do we get this from?
      onTaskDelete={onTaskDelete}
      onTaskEdit={onTaskEdit}
      showTaskDelete={showTaskDelete}
      showTaskEdit={showTaskEdit}
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
  showMilestoneStatus: false,
  onTaskDelete: undefined,
  onTaskEdit: undefined,
  showTaskDelete: false,
  showTaskEdit: false
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
  showMilestoneStatus: PropTypes.bool,
  onTaskDelete: PropTypes.func,
  onTaskEdit: PropTypes.func,
  showTaskDelete: PropTypes.bool,
  showTaskEdit: PropTypes.bool
};

export default RowMilestones;
