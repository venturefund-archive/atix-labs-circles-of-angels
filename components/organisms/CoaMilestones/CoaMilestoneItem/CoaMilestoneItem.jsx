import React from 'react';
import './coa-milestone-item.scss';
import PropTypes from 'prop-types';
import { Collapse, Icon } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import { CoaActivityItem } from 'components/organisms/CoaActivities/CoaActivityItem/CoaActivityItem';
import milestoneStatusMap from 'model/milestoneStatus';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { ACTIVITY_STATUS_ENUM } from 'model/activityStatus';

const { Panel } = Collapse;

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
  isProjectEditing,
  withStatusTag,
  withEvidences,
  canAddEvidences,
  projectId,
  preview
}) => {
  const { texts } = React.useContext(DictionaryContext);
  const description = milestone?.description;
  const status = milestone?.status;
  const title = milestone?.title;
  const budget = milestone?.budget;
  const spent = milestone?.spent || 0;
  const deposited = milestone?.deposited || 0;
  const areActivitiesOpen = milestone?.areActivitiesOpen || false;
  const remaining = budget - spent;
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
      statusMap={milestoneStatusMap}
      budget={budget}
      title={`${texts?.landingMilestones?.milestone || 'Milestone'} ${milestoneNumber} - ${title}`}
      entity="Activity"
      onEdit={onEditMilestone}
      onRemove={onRemoveMilestone}
      onCreate={onCreateActivity}
      remaining={remaining}
      spent={spent}
      deposited={deposited}
      className="o-coaMilestoneItem__card"
      alwaysShowBudget
      withStatusTag={withStatusTag}
      status={status}
      transferQuantity={transferQuantity}
      impactQuantity={impactQuantity}
      withEvidences={withEvidences}
      isProjectEditing={isProjectEditing}
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
                    {texts?.landingMilestones?.viewActivities || 'View Activities'}
                    {areActivitiesOpen ? <Icon type="down" /> : <Icon type="right" />}
                  </div>
                }
                className="o-coaMilestoneItem__collapse__panel"
                key="1"
              >
                <div className="o-coaMilestoneItem__cardsList">
                  {milestone?.activities.map((activity, index) => (
                    <CoaActivityItem
                      preview={preview}
                      projectId={projectId}
                      canAddEvidences={canAddEvidences}
                      withEvidences={withEvidences}
                      withStatusTag={withStatusTag}
                      onRemove={
                        [ACTIVITY_STATUS_ENUM.NEW].includes(activity?.status) &&
                        onRemoveActivity &&
                        (() => onRemoveActivity(activity?.id))
                      }
                      onEdit={
                        [ACTIVITY_STATUS_ENUM.NEW, ACTIVITY_STATUS_ENUM.IN_PROGRESS].includes(
                          activity?.status
                        ) &&
                        onEditActivity &&
                        (() => onEditActivity(activity))
                      }
                      isProjectEditing={isProjectEditing}
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
              <Icon type="plus" /> {texts?.landingMilestones?.addActivities || 'Add Activity'}
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
  toggleAreActivitiesOpened: undefined,
  isProjectEditing: false
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
  toggleAreActivitiesOpened: PropTypes.func,
  isProjectEditing: PropTypes.bool
};
