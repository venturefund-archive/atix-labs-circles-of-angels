import React from 'react';
import './coa-milestone-item.scss';
import PropTypes from 'prop-types';
import { Collapse, Icon } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import { CoaActivityItem } from 'components/organisms/CoaActivities/CoaActivityItem/CoaActivityItem';
import milestoneStatusMap from 'model/milestoneStatus';

const { Panel } = Collapse;

const ACTIVITY_STATUS = {
  NEW: 'new',
  TO_REVIEW: 'to-review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in-progress'
};

const MILESTONE_STATUS = {
  NEW: 'new',
  APPROVED: 'approved',
  IN_PROGRESS: 'in-progress'
};

const getMilestoneStatus = (activities = []) => {
  const areaAllActivitiesNew = activities?.every(
    activity => activity?.status === ACTIVITY_STATUS.NEW
  );
  if (areaAllActivitiesNew) return MILESTONE_STATUS.NEW;
  const areAllActivitiesApproved = activities?.every(
    activity => activity?.status === ACTIVITY_STATUS.APPROVED
  );
  if (areAllActivitiesApproved) return MILESTONE_STATUS.APPROVED;
  return MILESTONE_STATUS.IN_PROGRESS;
};

export const CoaMilestoneItem = ({
  milestoneNumber,
  currency,
  milestone,
  onRemoveMilestone,
  onEditMilestone,
  onCreateActivity,
  onRemoveActivity,
  onEditActivity,
  toggleAreActivitiesOpened,
  withStateTag,
  withEvidences,
  canAddEvidences,
  projectId
}) => {
  const description = milestone?.description;
  const title = milestone?.title;
  const budget = milestone?.budget;
  const spent = milestone?.spent || 0;
  const areActivitiesOpen = milestone?.areActivitiesOpen || false;
  const remaining = budget - spent;
  const status = getMilestoneStatus(milestone?.activities);
  const allEvidences = milestone?.activities?.reduce(
    (curr, next) => [...curr, ...(next?.evidences || [])],
    []
  );
  const transferQuantity = allEvidences?.reduce(
    (curr, next) => (next?.type === 'transfer' ? curr + 1 : curr),
    0
  );
  const impactQuantity = allEvidences?.reduce(
    (curr, next) => (next?.type === 'impact' ? curr + 1 : curr),
    0
  );

  return (
    <CoaIndicatorsCard
      {...{ currency }}
      stateMap={milestoneStatusMap}
      budget={budget}
      title={`Milestone ${milestoneNumber} - ${title}`}
      entity="Activity"
      onEdit={onEditMilestone}
      onRemove={onRemoveMilestone}
      onCreate={onCreateActivity}
      remaining={remaining}
      spent={spent}
      className="o-coaMilestoneItem__card"
      alwaysShowBudget
      withStateTag={withStateTag}
      state={status}
      transferQuantity={transferQuantity}
      impactQuantity={impactQuantity}
      withEvidences={withEvidences}
      additionalBody={
        <>
          <p className="o-coaMilestoneItem__description">{description}</p>
          {milestone?.activities?.length > 0 && (
            <Collapse
              activeKey={areActivitiesOpen ? '1' : '0'}
              defaultActiveKey={['0']}
              className="o-coaMilestoneItem__collapse"
              bordered={false}
              expandIcon={() => null}
            >
              <Panel
                header={
                  <div
                    tabIndex={0}
                    role="button"
                    className="o-coaMilestoneItem__collapse__header"
                    onClick={() => toggleAreActivitiesOpened(milestone?.id)}
                    onKeyDown={() => toggleAreActivitiesOpened(milestone?.id)}
                  >
                    View Activities
                    {areActivitiesOpen ? <Icon type="down" /> : <Icon type="right" />}
                  </div>
                }
                className="o-coaMilestoneItem__collapse__panel"
                key="1"
              >
                <div className="o-coaMilestoneItem__cardsList">
                  {milestone?.activities.map((activity, index) => (
                    <CoaActivityItem
                      projectId={projectId}
                      canAddEvidences={canAddEvidences}
                      withEvidences={withEvidences}
                      withStateTag={withStateTag}
                      onRemove={onRemoveActivity && (() => onRemoveActivity(activity?.id))}
                      onEdit={onEditActivity && (() => onEditActivity(activity))}
                      {...{ milestone, currency, activity }}
                      {...{ activityNumber: index + 1 }}
                    />
                  ))}
                </div>
              </Panel>
            </Collapse>
          )}
          {onCreateActivity && (
            <CoaTextButton
              className="o-coaMilestoneItem__addActivityButton"
              type="dashed"
              onClick={() => onCreateActivity(milestone)}
            >
              <Icon type="plus" /> Add Activity
            </CoaTextButton>
          )}
        </>
      }
    />
  );
};

CoaMilestoneItem.defaultProps = {
  milestoneNumber: undefined,
  currency: undefined,
  milestone: undefined,
  onRemoveMilestone: undefined,
  onEditMilestone: undefined,
  onCreateActivity: undefined,
  onRemoveActivity: undefined,
  onEditActivity: undefined,
  toggleAreActivitiesOpened: undefined
};

CoaMilestoneItem.propTypes = {
  milestoneNumber: PropTypes.number,
  currency: PropTypes.string,
  milestone: PropTypes.objectOf(PropTypes.any),
  onRemoveMilestone: PropTypes.func,
  onEditMilestone: PropTypes.func,
  onCreateActivity: PropTypes.func,
  onRemoveActivity: PropTypes.func,
  onEditActivity: PropTypes.func,
  toggleAreActivitiesOpened: PropTypes.func
};
