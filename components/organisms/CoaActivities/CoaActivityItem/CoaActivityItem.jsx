import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import React from 'react';

export const CoaActivityItem = ({
  activityNumber,
  currency,
  activity,
  onRemove,
  onEdit,
  milestone
}) => {
  const description = activity?.description;
  const acceptanceCriteria = activity?.acceptanceCriteria;
  const title = activity?.title;
  const indicators = activity?.indicators;
  return (
    <CoaIndicatorsCard
      {...{ currency }}
      budget={indicators?.budget}
      title={`Activity ${activityNumber} - ${title}`}
      onEdit={() => onEdit(activity)}
      onRemove={() => onRemove({ activityId: activity?.id, milestone })}
      remaining={indicators?.remaining}
      spent={indicators?.spent}
      additionalBody={
        <>
          <div>
            <p>Description</p>
            <p className="o-coaMilestoneItem__body__description">{description}</p>
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
