import React from 'react';
import './coa-activity-item.scss';
import PropTypes from 'prop-types';
import activityStatusMap from 'model/activityStatus';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'components/utils/UserContext';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { canAddEvidences } from 'helpers/canAddEvidence';
import classNames from 'classnames';
import { CoaActivityIndicatorsCard } from '../CoaActivityIndicatorsCard/CoaActivityIndicatorsCard';

const ACTIVITY_COLORS = {
  funding: 'green',
  spending: 'yellow',
  payback: 'violet'
};

export const CoaActivityItem = ({
  currency,
  activity,
  onRemove,
  onEdit,
  isProjectEditing,
  withStatusTag,
  withEvidences,
  projectId,
  preview,
  project
}) => {
  const history = useHistory();
  const { texts } = React.useContext(DictionaryContext);
  const { user } = React.useContext(UserContext);

  const _canAddEvidences = canAddEvidences({ user, project, activityType: activity?.type });

  const description = activity?.description;
  const acceptanceCriteria = activity?.acceptanceCriteria;
  const title = activity?.title;
  const budget = activity?.budget;
  const activityType = activity?.type;
  const current = activity?.current || 0;
  const status = activity?.status || '-';
  const transferQuantity = activity?.evidences?.reduce(
    (curr, next) => (next?.type === 'transfer' ? curr + 1 : curr),
    0
  );
  const impactQuantity = activity?.evidences?.reduce(
    (curr, next) => (next?.type === 'impact' ? curr + 1 : curr),
    0
  );

  return (
    <CoaActivityIndicatorsCard
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
      current={current}
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
        _canAddEvidences &&
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
