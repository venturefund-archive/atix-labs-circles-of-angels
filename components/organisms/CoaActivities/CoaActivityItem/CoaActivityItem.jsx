import React from 'react';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import './coa-activity-item.scss';

export const CoaActivityItem = ({ activityNumber, currency, activity, onRemove, onEdit }) => {
  const description = activity?.description;
  const acceptanceCriteria = activity?.acceptanceCriteria;
  const title = activity?.title;
  const budget = activity?.budget;
  const spent = activity?.spent || 0;
  const remaining = budget - spent;
  return (
    <CoaIndicatorsCard
      {...{ currency }}
      className="o-coaActivityItem__card"
      budget={budget}
      title={`Activity ${activityNumber} - ${title}`}
      onEdit={onEdit}
      onRemove={onRemove}
      remaining={remaining}
      spent={spent}
      isCollapsible
      additionalBody={
        <>
          <div>
            <p>Description</p>
            <p>{description}</p>
          </div>
          <div>
            <p>Acceptance Criteria</p>
            <p>{acceptanceCriteria}</p>
          </div>
        </>
      }
    />
  );
};
