import React from 'react';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import './coa-activity-item.scss';
import PropTypes from 'prop-types';
import activityStatusMap from 'model/activityStatus';
import { useHistory } from 'react-router-dom';
import { DictionaryContext } from 'components/utils/DictionaryContext';

export const CoaActivityItem = ({
  activityNumber,
  currency,
  activity,
  onRemove,
  onEdit,
  withStatusTag,
  withEvidences,
  canAddEvidences,
  projectId
}) => {
  const history = useHistory();
  const { texts } = React.useContext(DictionaryContext);

  const description = activity?.description;
  const acceptanceCriteria = activity?.acceptanceCriteria;
  const title = activity?.title;
  const budget = activity?.budget;
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
      withEvidences={withEvidences}
      statusMap={activityStatusMap}
      className="o-coaActivityItem__card"
      budget={budget}
      title={`Activity ${activityNumber} - ${title}`}
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
          history.push(`/${projectId}/activity/${activity?.id}/evidences`);
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
            <p className="o-coaActivityItem__indicatorTitle">{texts?.general?.description || 'Description'}</p>
            <p className="o-coaActivityItem__indicatorValue">{description}</p>
          </div>
          <div>
            <p className="o-coaActivityItem__indicatorTitle">{texts?.general?.acceptanceCriteria || 'Acceptance Criteria'}</p>
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
