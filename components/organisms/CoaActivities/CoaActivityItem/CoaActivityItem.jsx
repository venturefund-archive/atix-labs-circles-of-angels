import React from 'react';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import './coa-activity-item.scss';
import PropTypes from 'prop-types';
import activityStatusMap from 'model/activityStatus';

export const CoaActivityItem = ({
  activityNumber,
  currency,
  activity,
  onRemove,
  onEdit,
  withStateTag,
  withEvidences
}) => {
  const description = activity?.description;
  const acceptanceCriteria = activity?.acceptanceCriteria;
  const title = activity?.title;
  const budget = activity?.budget;
  const spent = activity?.spent || 0;
  const state = activity?.status || '-';
  const remaining = budget - spent;
  const transferQuantity = activity?.evidences?.reduce(
    (curr, next) => (next?.type === 'transfer' ? curr + 1 : curr),
    0
  );
  const impactQuantity = activity?.evidences?.reduce(
    (curr, next) => (next?.type === 'impact' ? curr + 1 : curr),
    0
  );

  return (
    <CoaIndicatorsCard
      {...{ currency }}
      withEvidences={withEvidences}
      stateMap={activityStatusMap}
      className="o-coaActivityItem__card"
      budget={budget}
      title={`Activity ${activityNumber} - ${title}`}
      onEdit={onEdit}
      onRemove={onRemove}
      remaining={remaining}
      spent={spent}
      isCollapsible
      withStateTag={withStateTag}
      state={state}
      transferQuantity={transferQuantity}
      impactQuantity={impactQuantity}
      onViewEvidence={
        withEvidences &&
        (e => {
          e.stopPropagation();
          console.log(`navigate to evidence for activity ${activity?.id}`);
        })
      }
      additionalBody={
        <>
          <div>
            <p className="o-coaActivityItem__indicatorTitle">Description</p>
            <p className="o-coaActivityItem__indicatorValue">{description}</p>
          </div>
          <div>
            <p className="o-coaActivityItem__indicatorTitle">Acceptance Criteria</p>
            <p className="o-coaActivityItem__indicatorValue">{acceptanceCriteria}</p>
          </div>
        </>
      }
    />
  );
};

CoaActivityItem.defaultProps = {
  activityNumber: undefined,
  currency: undefined,
  activity: undefined,
  onRemove: undefined,
  onEdit: undefined
};

CoaActivityItem.propTypes = {
  activityNumber: PropTypes.number,
  currency: PropTypes.string,
  activity: PropTypes.objectOf(PropTypes.any),
  onRemove: PropTypes.func,
  onEdit: PropTypes.func
};
