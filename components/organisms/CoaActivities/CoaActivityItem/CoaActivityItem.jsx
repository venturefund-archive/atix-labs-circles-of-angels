import React from 'react';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import './coa-activity-item.scss';
import PropTypes from 'prop-types';

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
