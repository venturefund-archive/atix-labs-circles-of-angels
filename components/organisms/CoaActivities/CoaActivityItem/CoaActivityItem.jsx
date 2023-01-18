import React from 'react';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import './coa-activity-item.scss';
import PropTypes from 'prop-types';
import activityStatusMap from 'model/activityStatus';
import { useHistory } from 'react-router-dom';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaActivityIndicators } from 'components/molecules/CoaActivityIndicators/CoaActivityIndicators';
import classNames from 'classnames';

const ACTIVITY_COLORS = {
  funding: 'green',
  spending: 'yellow',
  payback: 'violet'
};

export const CoaActivityItem = ({
  activityNumber,
  currency,
  activity,
  onRemove,
  onEdit,
  isProjectEditing,
  withStatusTag,
  withEvidences,
  canAddEvidences,
  projectId,
  preview
}) => {
  const history = useHistory();
  const { texts } = React.useContext(DictionaryContext);

  const description = activity?.description;
  const acceptanceCriteria = activity?.acceptanceCriteria;
  const title = activity?.title;
  const budget = activity?.budget;
  const activityType = activity?.type;
  const spent = activity?.spent || 0;
  const deposited = activity?.deposited || 0;
  const status = activity?.status || '-';
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
      isProjectEditing={isProjectEditing}
      withEvidences={withEvidences}
      statusMap={activityStatusMap}
      className={classNames('o-coaActivityItem__card', {
        [`--${ACTIVITY_COLORS[activityType]}`]: ACTIVITY_COLORS[activityType]
      })}
      color={ACTIVITY_COLORS[activityType]}
      budget={budget}
      title={
        <>
          <span
            className={classNames('o-coaActivityItem__card__titleType', {
              [`--${ACTIVITY_COLORS[activityType]}`]: ACTIVITY_COLORS[activityType]
            })}
          >
            {activityType}{' '}
          </span>
          - {title}
        </>
      }
      onEdit={onEdit}
      onRemove={onRemove}
      remaining={remaining}
      spent={spent}
      deposited={deposited}
      isCollapsible
      withStatusTag={withStatusTag}
      status={status}
      transferQuantity={transferQuantity}
      impactQuantity={impactQuantity}
      onViewEvidence={
        withEvidences &&
        (e => {
          e.stopPropagation();
          history.push(
            preview
              ? `/${projectId}/activity/${activity?.id}/evidences?preview=true`
              : `/${projectId}/activity/${activity?.id}/evidences`
          );
        })
      }
      onAddEvidences={
        canAddEvidences &&
        (e => {
          e.stopPropagation();
          history.push(`/${projectId}/activity/${activity?.id}/create-evidence`);
        })
      }
      additionalBody={
        <>
          <div>
            <p className="o-coaActivityItem__indicatorTitle">
              {texts?.general?.description || 'Description'}
            </p>
            <p className="o-coaActivityItem__indicatorValue">{description}</p>
          </div>
          <div>
            <p className="o-coaActivityItem__indicatorTitle">
              {texts?.general?.acceptanceCriteria || 'Acceptance Criteria'}
            </p>
            <p className="o-coaActivityItem__indicatorValue">{acceptanceCriteria}</p>
          </div>
        </>
      }
      IndicatorsComponent={CoaActivityIndicators}
    />
  );
};

CoaActivityItem.defaultProps = {
  activityNumber: undefined,
  currency: undefined,
  activity: undefined,
  onRemove: undefined,
  onEdit: undefined,
  isProjectEditing: false
};

CoaActivityItem.propTypes = {
  activityNumber: PropTypes.number,
  currency: PropTypes.string,
  activity: PropTypes.objectOf(PropTypes.any),
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  isProjectEditing: PropTypes.bool
};
