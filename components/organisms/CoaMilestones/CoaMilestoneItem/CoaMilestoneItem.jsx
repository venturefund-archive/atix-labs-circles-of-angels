import React from 'react';
import './coa-milestone-item.scss';
import PropTypes from 'prop-types';
import { Collapse, Icon } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import { CoaActivityItem } from 'components/organisms/CoaActivities/CoaActivityItem/CoaActivityItem';

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
  toggleAreActivitiesOpened
}) => {
  const description = milestone?.description;
  const title = milestone?.title;
  const budget = milestone?.budget;
  const spent = milestone?.spent || 0;
  const areActivitiesOpen = milestone?.areActivitiesOpen || false;
  const remaining = budget - spent;

  return (
    <CoaIndicatorsCard
      {...{ currency }}
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
                      onRemove={() => onRemoveActivity(activity?.id)}
                      onEdit={() => onEditActivity(activity)}
                      {...{ milestone, currency, activity }}
                      {...{ activityNumber: index + 1 }}
                    />
                  ))}
                </div>
              </Panel>
            </Collapse>
          )}
          <CoaTextButton
            className="o-coaMilestoneItem__addActivityButton"
            type="dashed"
            onClick={() => onCreateActivity(milestone)}
          >
            <Icon type="plus" /> Add Activity
          </CoaTextButton>
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
