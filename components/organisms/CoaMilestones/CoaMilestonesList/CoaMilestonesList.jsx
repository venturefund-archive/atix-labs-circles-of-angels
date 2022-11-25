import React from 'react';
import { CoaMilestoneItem } from '../CoaMilestoneItem/CoaMilestoneItem';
import './coa-milestones-list.scss';

export const CoaMilestonesList = ({
  data = [],
  currency,
  onRemoveMilestone,
  onEditMilestone,
  onCreateActivity,
  onRemoveActivity
}) => {
  return data.map((milestone, index) => (
    <CoaMilestoneItem
      {...{
        currency,
        milestone,
        onRemoveMilestone,
        onEditMilestone,
        onCreateActivity,
        onRemoveActivity
      }}
      {...{ milestoneNumber: index + 1 }}
    />
  ));
};
